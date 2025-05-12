import AppError from '../../../shared/erros/AppError';
import { UsersRepository } from '../infra/database/entities/repositories/userRepositorie';

interface IDeleteUser {
  id: number;
}
export default class DeleteUserService {
  async execute({ id }: IDeleteUser): Promise<void> {
    const user = await UsersRepository.findId(id);

    if (!user) {
      throw new AppError('User not find', 404);
    }

    await UsersRepository.remove(user);
  }
}
