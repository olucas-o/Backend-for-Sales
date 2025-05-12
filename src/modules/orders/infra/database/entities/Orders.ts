import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderProduct } from './OrderProducts';
import { Customer } from '../../../../customers/infra/database/entities/Customers';
import { IOrder } from '../../../domains/models/IOrder';

@Entity('orders')
export class Order implements IOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customerId' })
  customer: Customer;

  @OneToMany(() => OrderProduct, (order_products) => order_products.order, {
    cascade: true,
  })
  order_products: OrderProduct[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
