import AppError from '../../../shared/erros/AppError';
import { ProductsRepository } from '../database/entities/Repositiries/ProductsRepository';

interface IDeleteProduct {
  id: string;
}
export default class DeleteProductService {
  async execute({ id }: IDeleteProduct): Promise<void> {
    const product = await ProductsRepository.findId(id);

    if (!product) {
      throw new AppError('Product not find', 404);
    }

    await ProductsRepository.remove(product);
  }
}
