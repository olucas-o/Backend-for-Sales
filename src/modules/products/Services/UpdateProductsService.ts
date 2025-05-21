import { inject, injectable } from 'tsyringe';
import { RedisCache } from '../../../shared/cache/RedisCache';
import { IProduct } from '../domains/models/IProduct';
import { IUpdateProduct } from '../domains/models/IUpdateProduct';
import { IProductsRepository } from '../domains/repositories/IProductsRepository';

@injectable()
export default class UpdateProductService {
  constructor(
    @inject('ProductsRepository')
    private readonly ProductsRepository: IProductsRepository,
  ) {}
  async execute({
    id,
    name,
    price,
    quantity,
  }: IUpdateProduct): Promise<IProduct> {
    const productExists = await this.ProductsRepository.findId(Number(id));
    if (!productExists) {
      throw new Error('Product not found.');
    }

    if (name) {
      const productWithSameName =
        await this.ProductsRepository.findByName(name);
      if (productWithSameName && productWithSameName.id !== Number(id)) {
        throw new Error('Already has a Product with this name');
      }
    }
    if (name) productExists.name = name;
    if (price) productExists.price = price;
    if (quantity) productExists.quantity = quantity;

    const updatedProduct = await this.ProductsRepository.save(productExists);

    const redisCache = new RedisCache();
    await redisCache.invalidade('API_MY_SALES_PRODUCT_LIST');

    return updatedProduct;
  }
}
