import { UsersRepository } from '../infra/database/repositories/userRepositorie';
import { Users } from '../infra/database/entities/Users';

export default class ListUsersService {
  async execute(): Promise<Users[]> {
    const user = await UsersRepository.find();
    return user;
  }
}
