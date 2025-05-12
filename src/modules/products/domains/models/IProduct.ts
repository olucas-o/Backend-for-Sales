import { OrderProduct } from "../../../orders/infra/database/entities/OrderProducts";

export interface IProduct {
  id: number;
  name: string;
  price: number;
  quantity: number;
  description?: string | null;
  created_at: Date;
  updated_at: Date;
  order_products: OrderProduct[];
}
