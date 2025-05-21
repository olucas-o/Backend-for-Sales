import { RedisCache } from '../../../shared/cache/RedisCache';
import AppError from '../../../shared/erros/AppError';
import { IProductsRepository } from '../domains/repositories/IProductsRepository';

interface IDeleteProduct {
  id: string;
}
export default class DeleteProductService {
  constructor(private readonly ProductsRepository: IProductsRepository) {}
  async execute({ id }: IDeleteProduct): Promise<void> {
    const product = await this.ProductsRepository.findId(Number(id));

    if (!product) {
      throw new AppError('Product not find', 404);
    }

    await this.ProductsRepository.remove(product);

    const redisCache = new RedisCache();
    await redisCache.invalidade('API_MY_SALES_PRODUCT_LIST');
  }
}
