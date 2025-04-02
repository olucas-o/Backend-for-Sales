import AppError from '../../../shared/erros/AppError';
import { Users } from '../database/entities/Users';
import { UsersRepository } from '../database/entities/repositories/userRepositorie';

interface IShowUser {
  id: number;
}

export default class ShowUserService {
  async execute({ id }: IShowUser): Promise<Users> {
    const user = await UsersRepository.findId(id);
    if (!user) {
      throw new AppError('User not found', 404);
    }
    return user;
  }
}
