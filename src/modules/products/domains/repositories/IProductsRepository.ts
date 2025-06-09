import { Product } from '../../infra/database/entities/Product';
import { IFindProducts } from '../../infra/database/Repositiries/ProductsRepository';
import { ICreateProduct } from '../models/ICreateProduct';
import { IProduct } from '../models/IProduct';

export interface Pagination {
  take: number;
  skip: number;
}

export interface IProductsRepository {
  findByName(name: string): Promise<Product | null>;
  findId(id: number): Promise<Product | null>;
  findAllByIds(products: IFindProducts[]): Promise<Product[]>;
  create(data: ICreateProduct): Promise<Product>;
  save(product: IProduct): Promise<Product>;
  remove(product: Product): Promise<void>;
  findAndCount(pagination: Pagination): Promise<[IProduct[], number]>;
}
