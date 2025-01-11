import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { OrderItem } from './order-item.entity';
export enum OrderStatus {
    ACTIVE = 'active',
    DELETED = 'deleted'
}
@Entity('orders') // Table name
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    customerEmail: string; // Customer email


    @Column({ type: 'integer', default: 0 })  // Added type and default value
    foreignId: number;

    @Column({ type: 'varchar', length: 255 })
    customerName: string; // Assuming customer name is also passed


    @Column({
        type: 'enum',
        enum: OrderStatus,
        default: OrderStatus.ACTIVE
    })
    status: OrderStatus;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => OrderItem, (orderItem) => orderItem.order, { cascade: true })
    items: OrderItem[];
}
