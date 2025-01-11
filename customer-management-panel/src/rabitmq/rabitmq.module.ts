import { Module } from '@nestjs/common';
import { RabbitMQService } from './rabitmq.service';
import { OrderSyncModule } from '../order/order.module';

@Module({
    imports: [OrderSyncModule],
    providers: [RabbitMQService],
    exports: [RabbitMQService],
})
export class RabbitMQModule { }