import { Order } from '../../infra/database/entities/Orders';
import { ICreateOrder } from 'src/modules/orders/domains/models/ICreateOrder';
import { IOrder } from '../models/IOrder';

export interface Pagination {
  take: number;
  skip: number;
}

export interface IOrderRepository {
  createOrder({ customer, products }: ICreateOrder): Promise<IOrder>;
  findById(id: number): Promise<Order | null>;
  remove(order: IOrder): Promise<void>;
  save(order: IOrder): Promise<IOrder>;
}
