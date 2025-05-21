import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/erros/AppError';
import { ICreateProduct } from '../domains/models/ICreateProduct';
import { IProductsRepository } from '../domains/repositories/IProductsRepository';
import { Product } from '../infra/database/entities/Product';

@injectable()
export default class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private readonly ProductsRepository: IProductsRepository,
  ) {}
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
