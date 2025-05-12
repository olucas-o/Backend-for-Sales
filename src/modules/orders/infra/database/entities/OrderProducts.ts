import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Order } from './Orders';
import { Product } from '../../../../products/infra/database/entities/Product';
import { IOrderProduct } from '../../../domains/models/IOrderProduct';

@Entity('order_products')
export class OrderProduct implements IOrderProduct{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @Column()
  quantity: number;

  @ManyToOne(() => Order, (order) => order.order_products)
  @JoinColumn({ name: 'ordersId' })
  order: Order;

  @Column()
  productsId: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Product, (product) => product.order_products)
  @JoinColumn({ name: 'productsId' })
  product: Product;
}
