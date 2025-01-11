import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ProductModule } from './product/proudct.module';
import { OrderModule } from './order/order.module';
import { RabbitMQModule } from './rabitmq/rabitmq.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true, // Set to false in production
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET, // Add this to your .env file
      signOptions: { expiresIn: '1h' },
    }),
    AuthModule,
    ProductModule,
    OrderModule,
    RabbitMQModule,
  ],
})
export class AppModule { }