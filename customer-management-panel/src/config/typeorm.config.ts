import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import {User} from "../auth/entities/user.entity"
import { Order } from '../order/entities/order.entity';
import { OrderItem } from '../order/entities/order-item.entity';

dotenv.config();
const typeOrmConfig = new DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    },
    entities: [User, Order, OrderItem],
    migrations: [__dirname + '/../database/migrations/*.ts'],

    migrationsTableName: 'migrations',
    synchronize: false,
    logging: true
});

export default typeOrmConfig;