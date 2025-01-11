import { DataSource } from 'typeorm';
import { Product } from '../product/entities/product.entity';
import { Order } from '../order/entities/order.entity';
import { OrderItem } from '../order/entities/order-item.entity';
import * as dotenv from 'dotenv';

dotenv.config();
const typeOrmConfig = new DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    },
    entities: [Product, Order, OrderItem],
    migrations: [__dirname + '/../database/migrations/*.ts'],

    migrationsTableName: 'migrations',
    synchronize: false,
    logging: true
});

export default typeOrmConfig;