import { In } from 'typeorm';
import { AppDataSource } from '../../../../../../shared/infra/typeorm/data-source';
import { Product } from '../Product';

interface IFindProducts {
  id: number;
}

export const ProductsRepository = AppDataSource.getRepository(Product).extend({
  async findByName(name: string): Promise<Product | null> {
    return this.findOneBy({ name });
  },
  async findId(id: number): Promise<Product | null> {
    return this.findOneBy({ id });
  },
  async findAllByIds(products: IFindProducts[]): Promise<Product[]> {
    const productIds = products.map((product) => product.id);

    const existingProducts = await this.find({
      where: {
        id: In(productIds),
      },
    });

    return existingProducts;
  },
});
