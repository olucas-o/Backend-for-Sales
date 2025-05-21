import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/erros/AppError';
import { IProductsRepository } from '../domains/repositories/IProductsRepository';
import { Product } from '../infra/database/entities/Product';

interface IShowProduct {
  id: string;
}

@injectable()
export default class ShowProductService {
  constructor(@inject('ProductsRepository') private readonly ProductsRepository: IProductsRepository) {}
  async execute({ id }: IShowProduct): Promise<Product> {
    const product = await this.ProductsRepository.findId(Number(id));
    if (!product) {
      throw new AppError('Product not found', 404);
    }
    return product;
  }
}
