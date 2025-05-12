import AppError from '../../../shared/erros/AppError';
import { Product } from '../infra/database/entities/Product';
import { ProductsRepository } from '../infra/database/entities/Repositiries/ProductsRepository';

interface IShowProduct {
  id: string;
}

export default class ShowProductService {
  async execute({ id }: IShowProduct): Promise<Product> {
    const product = await ProductsRepository.findId(id);
    if (!product) {
      throw new AppError('Product not found', 404);
    }
    return product;
  }
}
