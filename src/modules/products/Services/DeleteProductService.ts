import AppError from '../../../shared/erros/AppError';
import { ProductsRepository } from '../database/entities/Repositiries/ProductsRepository';

interface IDeleteProduct {
  id: string;
}
export default class DeleteProductService {
  async execute({ id }: IDeleteProduct): Promise<void> {
    const product = await ProductsRepository.findId(id);

    if (!product) {
      throw new AppError('Produto não encontrado', 404);
    }

    await ProductsRepository.remove(product);
  }
}
