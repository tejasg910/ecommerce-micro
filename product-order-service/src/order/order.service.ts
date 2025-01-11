import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { RabbitMQService } from 'src/rabitmq/rabitmq.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
    @Inject(forwardRef(() => RabbitMQService))
    private readonly rabbitMQService: RabbitMQService,

  ) { }

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    // First save the order
    const order = await this.orderRepository.save({
      userEmail: createOrderDto.userEmail,
      totalPrice: createOrderDto.totalPrice,
      address: createOrderDto.address,
      fullName: createOrderDto.fullName,
    });

    // Then create and save order items
    const orderItems = createOrderDto.items.map(item =>
      this.orderItemRepository.create({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
        order: order, // Associate with saved order
      }),
    );

    // Save all order items
    await this.orderItemRepository.save(orderItems);

    // Return the complete order with items
    const completeOrder = await this.orderRepository.findOne({
      where: { id: order.id },
      relations: ['items', 'items.product'],
    });


    console.log(completeOrder, 'this is complete order')
    const orderItemsDataRabitMQ = completeOrder.items.map((item) => {
      return {
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.image,
        description: item.product.description,

      }
    })

    const orderForQueue = {
      userEmail: createOrderDto.userData.email,
      fullName: createOrderDto.userData.fullName,
      address: createOrderDto.address,
      totalPrice: completeOrder.totalPrice,
      items: orderItemsDataRabitMQ,  // This includes complete product data
      userData: createOrderDto.userData,
      foreignId: completeOrder.id

    };

    // Send to RabbitMQ
    await this.rabbitMQService.sendPlaceOrder(orderForQueue);

    return completeOrder;
  }

  async findOne(id: number): Promise<Order> {
    return this.orderRepository.findOne({
      where: { id },
      relations: ['items'],
    });
  }

  async findAll(page = 1, limit = 10): Promise<{
    items: Order[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    const [items, total] = await this.orderRepository
  .createQueryBuilder('order')
  .leftJoinAndSelect('order.items', 'orderItem')
  .leftJoinAndSelect('orderItem.product', 'product')
  .orderBy('order.createdAt', 'DESC')
  .skip((page - 1) * limit)
  .take(limit)
  .getManyAndCount();

    return {
      items,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }



  async updateOrderStatus(orderId: number, status: string): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id: orderId }
    });

    if (!order) {
      throw new Error(`Order with ID ${orderId} not found`);
    }

    order.status = status;
    return this.orderRepository.save(order);
  }
}