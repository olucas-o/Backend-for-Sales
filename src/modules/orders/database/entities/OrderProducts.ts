import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Order } from '../Orders';
import { Product } from '../../../products/database/entities/Product';

@Entity('order_products')
export class OrderProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @Column()
  quantity: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Order, (order) => order.order_products)
  @JoinColumn({ name: 'orderId' })
  order: Order;

  @ManyToOne(() => Product, (product) => product.order_products)
  @JoinColumn({ name: 'productId' })
  product: Product;
}
