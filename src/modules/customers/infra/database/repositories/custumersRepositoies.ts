import { AppDataSource } from '../../../../../shared/infra/typeorm/data-source';
import { Customer } from '../entities/Customers';

export const customersRepository = AppDataSource.getRepository(Customer).extend(
  {
    async findByEmail(email: string): Promise<Customer | null> {
      return this.findOneBy({ email });
    },
    async findByName(name: string): Promise<Customer | null> {
      return this.findOneBy({ name });
    },
    async findId(id: number): Promise<Customer | null> {
      return this.findOneBy({ id });
    },
  },
);
