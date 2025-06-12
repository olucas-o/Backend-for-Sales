import { Product } from '../../infra/database/entities/Product';
import { IFindProducts } from '../../infra/database/Repositiries/ProductsRepository';
import { ICreateProduct } from '../models/ICreateProduct';
import { IProduct } from '../models/IProduct';
import {
  IProductsRepository,
  Pagination,
} from '../repositories/IProductsRepository';

export default class FakeProductsRepository implements IProductsRepository {
  private products: Product[] = [];
  async findAllByIds(products: IFindProducts[]): Promise<Product[]> {
    throw new Error('Method not implemented.');
  }
  async findByName(name: string): Promise<Product | null> {
    const product = this.products.find((product) => product.name === name);
    return product as Product | null;
  }

  public async findId(id: number): Promise<Product | null> {
    const product = this.products.find((product) => product.id === id);
    return product as Product | null;
  }

  public async create({
    name,
    price,
    quantity,
    description,
  }: ICreateProduct): Promise<Product> {
    const product = new Product();

    product.id = this.products.length + 1;
    product.name = name;
    product.price = price;
    product.quantity = quantity;
    product.description = description;

    this.products.push(product);

    return product;
  }

  async save(product: Product): Promise<Product> {
    const saveproduct = this.products.findIndex(
      (findProduct) => findProduct.id === product.id,
    );
    this.products[saveproduct] = product;
    return product;
  }

  public async remove(product: Product): Promise<void> {
    const index = this.products.findIndex((p) => p.id === product.id);
    if (index !== -1) {
      this.products.splice(index, 1);
    }
  }

  findAndCount(_pagination: Pagination): Promise<[IProduct[], number]> {
    throw new Error('Method not implemented.');
  }
}
