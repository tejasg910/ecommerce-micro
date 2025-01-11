import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { OrderItem } from '../entities/order-item.entity';

export class CreateOrderDto {
  @IsEmail()
  @IsNotEmpty()
  userEmail: string;

  @IsNumber()
  @IsNotEmpty()
  totalPrice: number;

  @IsString()
  @IsNotEmpty()
  address: string;


  @IsString()
  @IsNotEmpty()
  fullName: string;

  @Type(() => OrderItem)
  @IsNotEmpty()
  items: OrderItem[];

  userData: UserDataInOrder;
}


export class UserDataInOrder {
  fullName: string;
  password: string;
  email: string;

}

export class OrderItems {
  name: string;
  price: number;
  quantity: number;
  image: string;
  description: string
}
export class RabitMQDataPlaceOrder {
  userData: UserDataInOrder;
  userEmail: string;
  address: string;
  fullName: string;
  totalPrice: number;
  items: OrderItems[]
  foreignId: number

}