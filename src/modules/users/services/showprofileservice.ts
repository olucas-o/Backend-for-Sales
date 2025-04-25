import AppError from '../../../shared/erros/AppError';
import { UsersRepository } from '../database/entities/repositories/userRepositorie';
import { Users } from '../database/entities/Users';

interface IShowProfileRequest {
  user_id: number;
}

export default class ShowProfileService {
  public async execute({ user_id }: IShowProfileRequest): Promise<Users> {
    const user = await UsersRepository.findId(user_id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    return user;
  }
}
