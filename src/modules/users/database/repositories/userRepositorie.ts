import { AppDataSource } from '../../../../shared/typeorm/data-source';
import { Users } from '../Users';

export const UsersRepository = AppDataSource.getRepository(Users).extend({
  async findByMail(mail : string): Promise<Users | null> {
    return this.findOneBy({ mail });
  },
  async findId(id: string): Promise<Users | null> {
    return this.findOneBy({ id });
  },
});
