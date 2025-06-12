import { Customer } from 'src/modules/customers/infra/database/entities/Customers';
import { ICreateOrderProducts } from './ICreateOrderProducts';

export interface ICreateOrder {
  customer: Customer;
  products: ICreateOrderProducts[];
}
