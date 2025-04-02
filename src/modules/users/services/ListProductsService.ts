import { Users } from '../database/entities/Users';
import { UsersRepository } from '../database/entities/repositories/userRepositorie';

export default class ListUsersService {
  async execute(): Promise<Users[]> {
    const user = await UsersRepository.find();
    return user;
  }
}
