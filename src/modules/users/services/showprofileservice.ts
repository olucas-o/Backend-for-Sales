import AppError from '../../../shared/erros/AppError';
import { UsersRepository } from '../database/entities/repositories/userRepositorie';
import { Users } from '../database/entities/Users';

interface IShowProfileRequest {
  userId: number;
}

export default class ShowProfileService {
  public async execute({ userId }: IShowProfileRequest): Promise<Users> {
    const user = await UsersRepository.findId(userId);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    return user;
  }
}
