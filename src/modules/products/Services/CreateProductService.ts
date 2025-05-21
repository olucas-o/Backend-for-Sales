import AppError from '../../../shared/erros/AppError';
import { ICreateProduct } from '../domains/models/ICreateProduct';
import { IProductsRepository } from '../domains/repositories/IProductsRepository';
import { Product } from '../infra/database/entities/Product';

export default class CreateProductService {
  constructor(private readonly ProductsRepository: IProductsRepository) {}
  public async execute({
    name,
    price,
    quantity,
  }: ICreateProduct): Promise<Product> {
    const productExists = await this.ProductsRepository.findByName(name);

    if (productExists) {
      throw new AppError('There is already one product with this name', 409);
    }

    const product = this.ProductsRepository.create({
      name,
      price,
      quantity,
    });

    return product;
  }
}
