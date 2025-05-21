import AppError from '../../../shared/erros/AppError';
import { IProductsRepository } from '../domains/repositories/IProductsRepository';
import { Product } from '../infra/database/entities/Product';

interface IShowProduct {
  id: number;
}

export default class ShowProductService {
  constructor(private readonly ProductsRepository: IProductsRepository) {}
  async execute({ id }: IShowProduct): Promise<Product> {
    const product = await this.ProductsRepository.findId(id);
    if (!product) {
      throw new AppError('Product not found', 404);
    }
    return product;
  }
}
