import { forwardRef, Module } from '@nestjs/common';
import { RabbitMQService } from './rabitmq.service';
import { OrderModule } from 'src/order/order.module';

@Module({
    imports: [forwardRef(() => OrderModule)],

    providers: [RabbitMQService],
    exports: [RabbitMQService],
})
export class RabbitMQModule { }
