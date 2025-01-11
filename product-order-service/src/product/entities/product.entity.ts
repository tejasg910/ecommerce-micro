import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('products') // Table name
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;


  @Column({ type: 'boolean', default: false })
  isDeleted: boolean;

  @Column({ type: 'int' })
  stock: number;

  // @Column({ type: 'varchar', length: 255 })
  // category: string;

  @Column({ type: 'varchar', length: 255, nullable: true }) // Image URL as a string
  image: string;
}
