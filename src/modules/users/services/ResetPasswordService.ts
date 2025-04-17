import { addHours, isAfter } from 'date-fns';
import { hash } from 'bcrypt';
import { UsersRepository } from '../database/entities/repositories/userRepositorie';
import { UserTokensRepositories } from '../database/entities/repositories/UserTokensRepositories';

interface IResetPasswordData {
  token: string;
  password: string;
}
export default class ResetPasswordService {
  public async execute({ token, password }: IResetPasswordData): Promise<void> {
    const userToken = await UserTokensRepositories.findByToken(token);

    if (!userToken) {
      throw new Error('User token not exists');
    }

    const user = await UsersRepository.findId(userToken.user_id);

    if (!user) {
      throw new Error('User not exists');
    }

    const compareDate = addHours(userToken.created_at, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new Error('Token expired');
    }
    const hashedPassword = await hash(password, 8);

    user.password = hashedPassword;

    await UsersRepository.save(user);
  }
}
