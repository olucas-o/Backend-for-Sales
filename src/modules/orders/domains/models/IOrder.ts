import { Customer } from '../../../customers/infra/database/entities/Customers';
import { OrderProduct } from '../../infra/database/entities/OrderProducts';

export interface IOrder {
  id: number;
  customer: Customer;
  order_products: OrderProduct[];
  createdAt: Date;
  updatedAt: Date;
}
