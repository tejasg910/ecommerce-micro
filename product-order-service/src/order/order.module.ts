import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { RabbitMQModule } from 'src/rabitmq/rabitmq.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderItem]),
    forwardRef(() => RabbitMQModule),
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService]
})
export class OrderModule { }