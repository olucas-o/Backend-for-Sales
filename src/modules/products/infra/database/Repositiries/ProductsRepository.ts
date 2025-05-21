import { In, Repository } from 'typeorm';
import { AppDataSource } from '../../../../../shared/infra/typeorm/data-source';
import { Product } from '../entities/Product';
import {
  IProductsRepository,
  Pagination,
} from '../../../domains/repositories/IProductsRepository';
import { ICreateProduct } from '../../../domains/models/ICreateProduct';
import { IProduct } from '../../../domains/models/IProduct';

export interface IFindProducts {
  id: number;
}

export default class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;
  constructor() {
    this.ormRepository = AppDataSource.getRepository(Product);
  }
  async findByName(name: string): Promise<Product | null> {
    return this.ormRepository.findOneBy({ name });
  }
  async findId(id: number): Promise<Product | null> {
    return this.ormRepository.findOneBy({ id });
  }
  async findAllByIds(products: IFindProducts[]): Promise<Product[]> {
    const productIds = products.map((product) => product.id);

    const existingProducts = await this.ormRepository.find({
      where: {
        id: In(productIds),
      },
    });

    return existingProducts;
  }
  async create({ name, price, quantity }: ICreateProduct): Promise<Product> {
    const product = this.ormRepository.create({ name, price, quantity });
    await this.ormRepository.save(product);
    return product;
  }
  async save(product: IProduct): Promise<IProduct> {
    const saveproduct = await this.ormRepository.save(product);
    return saveproduct;
  }
  async remove(product: Product): Promise<void> {
    await this.ormRepository.remove(product);
  }
  async findAndCount({
    take,
    skip,
  }: Pagination): Promise<[IProduct[], number]> {
    const [product, total] = await this.ormRepository.findAndCount({
      take,
      skip,
    });
    return [product, total];
  }
}
