import { RedisCache } from '../../../shared/cache/RedisCache';
import AppError from '../../../shared/erros/AppError';
import { Product } from '../database/entities/Product';
import { ProductsRepository } from '../database/entities/Repositiries/ProductsRepository';

interface ICreateProduct {
  name: string;
  price: number;
  quantity: number;
}

export default class CreateProductService {
  public async execute({
    name,
    price,
    quantity,
  }: ICreateProduct): Promise<Product> {
    const productExists = await ProductsRepository.findByName(name);

    if (productExists) {
      throw new AppError('There is already one product with this name', 409);
    }

    const product = ProductsRepository.create({
      name,
      price,
      quantity,
    });

    await ProductsRepository.save(product);

    const redisCache = new RedisCache()
    await redisCache.invalidade('API_MY_SALES_PRODUCT_LIST');

    return product;
  }
}
