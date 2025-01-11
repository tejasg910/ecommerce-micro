// src/order-sync/order-sync.module.ts
import { forwardRef, MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { User } from '../auth/entities/user.entity';
import { OrderSyncController } from './order.controller';
import { OrderSyncService } from './order.service';
import { JwtUserMiddleware } from 'src/middleware/jwt-user.middlware';
import { RabbitMQModule } from 'src/rabitmq/rabitmq.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Order, OrderItem, User],
        ),
        forwardRef(() => RabbitMQModule),
    ],
    controllers: [OrderSyncController],
    providers: [OrderSyncService],
    exports: [OrderSyncService],
})
export class OrderSyncModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(JwtUserMiddleware)
            .forRoutes('*'); // Apply to all routes, or specify specific routes
    }
}