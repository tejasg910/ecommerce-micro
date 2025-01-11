// src/order-sync/order-sync.service.ts
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Order, OrderStatus } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { User } from '../auth/entities/user.entity';
import { RabitMQDataPlaceOrder } from './dto/order-item.dto';
import { RabbitMQService } from 'src/rabitmq/rabitmq.service';

@Injectable()
export class OrderSyncService {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
        @InjectRepository(OrderItem)
        private readonly orderItemRepository: Repository<OrderItem>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @Inject(forwardRef(() => RabbitMQService))

        private readonly rabbitMQService: RabbitMQService

    ) { }

    async processOrder(orderData: RabitMQDataPlaceOrder) {
        // First, check if user exists and create if not

        console.log(orderData, "this is roder data")
        await this.createUserIfNotExists(orderData.userData);

        // Create order
        const order = this.orderRepository.create({
            customerEmail: orderData.userEmail,
            customerName: orderData.fullName,
            foreignId: orderData.foreignId !== undefined ? orderData.foreignId : 0
        });

        // Save order
        const savedOrder = await this.orderRepository.save(order);

        // Create order items
        const orderItems = orderData.items.map(item =>
            this.orderItemRepository.create({
                productName: item.name,
                price: item.price,
                quantity: item.quantity,
                productImage: item.image,
                order: savedOrder,
            })
        );

        // Save order items
        await this.orderItemRepository.save(orderItems);

        console.log(`Order processed for user: ${orderData.userEmail}`);
        return savedOrder;
    }

    private async createUserIfNotExists(userData: { email: string; password: string; fullName: string }) {
        const existingUser = await this.userRepository.findOne({
            where: { email: userData.email }
        });
        try {
            // Check if user exists


            if (!existingUser) {
                // Hash password and create new user
                const hashedPassword = await bcrypt.hash(userData.password, 10);
                const newUser = this.userRepository.create({
                    email: userData.email,
                    password: hashedPassword,
                    fullName: userData.fullName,
                });

                await this.userRepository.save(newUser);
                console.log(`New user created: ${userData.email}`);
                return { success: true, message: 'User created successfully', isNew: true };
            } else {
                // Update existing user
                // Only hash password if it's provided
                if (userData.password) {
                    existingUser.password = await bcrypt.hash(userData.password, 10);
                }

                // Update other fields
                existingUser.fullName = userData.fullName;

                await this.userRepository.save(existingUser);
                console.log(`User updated: ${userData.email}`);
                return { success: true, message: 'User updated successfully', isNew: false };
            }
        } catch (error) {
            console.error('Error in createOrUpdateUser:', error);
            throw new Error(`Failed to ${existingUser ? 'update' : 'create'} user: ${error.message}`);
        }
    }

    async findOrdersByUser(email: string) {

        return this.orderRepository.find({
            where: { customerEmail: email, status: OrderStatus.ACTIVE },
            relations: ['items'],
            order: {
                createdAt: 'DESC',
            },
        });
    }

    async findOrderById(id: number) {
        return this.orderRepository.findOne({
            where: { id, status: OrderStatus.ACTIVE },
            relations: ['items'],
        });
    }







    async softDeleteOrder(orderId: string) {
        const order = await this.orderRepository.findOne({
            where: { id: Number(orderId) }
        });

        if (!order) {
            throw new Error('Order not found');
        }

        // Update order status
        order.status = OrderStatus.DELETED;
        await this.orderRepository.save(order);

        // Send deletion message to first microservice
        await this.rabbitMQService.sendDeleteOrder({
            type: 'DELETE_ORDER',
            foreignId: order.foreignId,

        });

        return order;
    }
}