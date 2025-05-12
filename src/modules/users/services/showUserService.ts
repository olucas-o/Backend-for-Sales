import AppError from '../../../shared/erros/AppError';
import { UsersRepository } from '../infra/database/entities/repositories/userRepositorie';
import { Users } from '../infra/database/entities/Users';

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
