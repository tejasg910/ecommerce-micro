import { forwardRef, Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Connection, Channel, connect, ConsumeMessage } from 'amqplib';
import { OrderService } from 'src/order/order.service';

@Injectable()
export class RabbitMQService implements OnModuleInit {
    private connection: Connection;
    private channel: Channel;
    private readonly placeOrderQueue = 'place_order_queue';
    private readonly deleteOrderQueue = 'delete_order_queue';
    private readonly queueOptions = {
        durable: true,
        arguments: {
            'x-queue-type': 'classic'
        }
    };

    constructor(
        @Inject(forwardRef(() => OrderService))
        private readonly orderService: OrderService
    ) { }

    async onModuleInit() {
        try {
            await this.initialize();
            // Each service will only consume from its respective queue

            await this.consumeDeleteOrders();

        } catch (error) {
            console.error('Failed to initialize RabbitMQ:', error);
        }
    }

    private async initialize() {
        try {
            this.connection = await connect(process.env.RABBITMQ_URL);
            this.channel = await this.connection.createChannel();

            // Assert both queues
            await this.channel.assertQueue(this.placeOrderQueue, this.queueOptions);
            await this.channel.assertQueue(this.deleteOrderQueue, this.queueOptions);

            console.log('Successfully connected to RabbitMQ and created queues');
        } catch (error) {
            console.error('RabbitMQ connection error:', error);
            throw error;
        }
    }



    private async consumeDeleteOrders() {
        try {
            await this.channel.prefetch(1);
            console.log(`Waiting for messages in queue: ${this.deleteOrderQueue}`);

            this.channel.consume(this.deleteOrderQueue, async (msg: ConsumeMessage) => {
                if (!msg) return;

                try {
                    const data = JSON.parse(msg.content.toString());
                    console.log(data, "this isdata")
                    await this.orderService.updateOrderStatus(data.foreignId, 'deleted');
                    this.channel.ack(msg);
                } catch (error) {
                    console.error('Error processing delete order message:', error);
                    this.channel.nack(msg, false, false);
                }
            }, { noAck: false });
        } catch (error) {
            console.error('Error in consumeDeleteOrders:', error);
            throw error;
        }
    }

    // Method for first service to send delete order
    async sendDeleteOrder(data: any) {
        try {
            await this.channel.sendToQueue(
                this.deleteOrderQueue,
                Buffer.from(JSON.stringify(data)),
                { persistent: true }
            );
            console.log('Delete order message sent successfully');
        } catch (error) {
            console.error('Error sending delete order message:', error);
            throw error;
        }
    }

    // Method for second service to send place order
    async sendPlaceOrder(data: any) {
        try {
            await this.channel.sendToQueue(
                this.placeOrderQueue,
                Buffer.from(JSON.stringify(data)),
                { persistent: true }
            );
            console.log('Place order message sent successfully');
        } catch (error) {
            console.error('Error sending place order message:', error);
            throw error;
        }
    }

    async onApplicationShutdown() {
        try {
            if (this.channel) await this.channel.close();
            if (this.connection) await this.connection.close();
        } catch (error) {
            console.error('Error closing RabbitMQ connections:', error);
        }
    }
}