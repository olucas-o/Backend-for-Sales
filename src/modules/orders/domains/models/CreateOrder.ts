import { Product } from "../../../products/infra/database/entities/Product";

export interface ICreateOrder {
  customerId: string;
  products: Product[];
}
