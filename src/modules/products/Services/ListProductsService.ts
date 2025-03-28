import { Product } from '../database/entities/Product';
import { ProductsRepository } from '../database/entities/Repositiries/ProductsRepository';
export default class ListProductService {
  async execute(): Promise<Product[]> {
    const products = await ProductsRepository.find();
    return products;
  }
}
