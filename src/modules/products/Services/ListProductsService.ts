import { inject, injectable } from 'tsyringe';
import { RedisCache } from '../../../shared/cache/RedisCache';
import { IPagination } from '../../../shared/interface/pagination';
import { IProductsRepository } from '../domains/repositories/IProductsRepository';
import { Product } from '../infra/database/entities/Product';

@injectable()
export default class ListProductService {
  constructor(
    @inject('ProductsRepository')
    private readonly ProductsRepository: IProductsRepository,
  ) {}
  async execute(
    page: number = 1,
    limit: number = 10,
  ): Promise<IPagination<Product>> {
    const [data, total] = await this.ProductsRepository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
    });
    const totalPages = Math.ceil(total / limit);

    const redisCache = new RedisCache();

    let products = await redisCache.recover<Product[]>(
      'API_MY_SALES_PRODUCT_LIST',
    );

    if (!products) {
      products;
      await redisCache.save(
        'API_MY_SALES_PRODUCT_LIST',
        JSON.stringify(products),
      );
    }
    return {
      data,
      total,
      perPage: limit,
      currentPage: page,
      totalPages: totalPages,
      nextPage: page < totalPages ? page + 1 : null,
      prevPage: page > 1 ? page - 1 : null,
    } as IPagination<Product>;
  }
}
