import { AppDataSource } from '../../../../../shared/typeorm/data-source';
import { Users } from '../Users';

export const UsersRepository = AppDataSource.getRepository(Users).extend({
  async findByEmail(email: string): Promise<Users | null> {
    return this.findOneBy({ email });
  },
  async findByName(name: string): Promise<Users | null> {
    return this.findOneBy({ name });
  },
  async findId(id: number): Promise<Users | null> {
    return this.findOneBy({ id });
  },
});
