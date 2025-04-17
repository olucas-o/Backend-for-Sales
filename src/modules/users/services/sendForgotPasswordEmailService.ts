import AppError from '../../../shared/erros/AppError';
import { UsersRepository } from '../database/entities/repositories/userRepositorie';
import { UserTokensRepositories } from '../database/entities/repositories/UserTokensRepositories';

interface IForgotPassword {
  email: string;
}

export default class SendForgotPasswordEmailService {
  async execute({ email }: IForgotPassword): Promise<void> {
    const user = await UsersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User not found', 404);
    }
    const token = await UserTokensRepositories.generate(user.id);
  }
}
