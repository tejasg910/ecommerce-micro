import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RabbitMQModule } from './rabitmq/rabitmq.module';
import { OrderSyncModule } from './order/order.module';
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
    RabbitMQModule,
    OrderSyncModule,

  ],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule { }
