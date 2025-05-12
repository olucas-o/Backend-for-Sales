import { RedisCache } from '../../../shared/cache/RedisCache';
import { Product } from '../infra/database/entities/Product';
import { ProductsRepository } from '../infra/database/entities/Repositiries/ProductsRepository';

export default class ListProductService {
  async execute(): Promise<Product[]> {
    const redisCache = new RedisCache();

    let products = await redisCache.recover<Product[]>(
      'API_MY_SALES_PRODUCT_LIST',
    );

    if (!products) {
      products = await ProductsRepository.find();
      await redisCache.save(
        'API_MY_SALES_PRODUCT_LIST',
        JSON.stringify(products),
      );
    }

    return products;
  }
}
