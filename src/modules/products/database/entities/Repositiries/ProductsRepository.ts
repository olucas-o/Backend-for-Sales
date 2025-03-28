import { AppDataSource } from '../../../../../shared/typeorm/data-source';
import { Product } from '../Product';

export const ProductsRepository = AppDataSource.getRepository(Product).extend({
  async findByName(name: string): Promise<Product | null> {
    return this.findOneBy({ name });
  },
  async findId(id: string): Promise<Product | null> {
    return this.findOneBy({ id });
  },
});
