import { RedisCache } from '../../../shared/cache/RedisCache';
import { Product } from '../database/entities/Product';
import { ProductsRepository } from '../database/entities/Repositiries/ProductsRepository';

interface IUpdateProduct {
  id: number;
  name: string;
  price: number;
  quantity: number;
}
export default class UpdateProductService {
  async execute({
    id,
    name,
    price,
    quantity,
  }: IUpdateProduct): Promise<Product> {
    const productExists = await ProductsRepository.findId(id);
    if (!productExists) {
      throw new Error('Product not found.');
    }

    if (name) {
      const productWithSameName = await ProductsRepository.findByName(name);
      if (productWithSameName && productWithSameName.id !== id) {
        throw new Error('Already has a Product with this name');
      }
    }
    if (name) productExists.name = name;
    if (price) productExists.price = price;
    if (quantity) productExists.quantity = quantity;

    const updatedProduct = await ProductsRepository.save(productExists);

    const redisCache = new RedisCache();
    await redisCache.invalidade('API_MY_SALES_PRODUCT_LIST');

    return updatedProduct;
  }
}
