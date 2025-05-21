import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { OrderProduct } from '../../../../orders/infra/database/entities/OrderProducts';
import { IProduct } from '../../../domains/models/IProduct';

@Entity('products')
export class Product implements IProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'decimal' })
  price: number;

  @Column({ type: 'int' })
  quantity: number;

  @Column('jsonb', { nullable: true })
  description: string | null;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.product)
  order_products: OrderProduct[];
}
