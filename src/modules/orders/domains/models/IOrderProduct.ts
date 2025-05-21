import { Product } from '../../../products/infra/database/entities/Product';
import { Order } from '../../infra/database/entities/Orders';

export interface IOrderProduct {
  id: number;
  price: number;
  quantity: number;
  order: Order;
  productsId: number;
  created_at: Date;
  updated_at: Date;
  product: Product;
}
