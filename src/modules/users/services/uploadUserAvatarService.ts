import path from 'path';
import AppError from '../../../shared/erros/AppError';
import fs from 'fs';
import uploadConfig from '../../../config/upload';
import { UsersRepository } from '../infra/database/entities/repositories/userRepositorie';
import { Users } from '../infra/database/entities/Users';

interface IUpdateUserAvatar {
  userId: number;
  avatarFileName: string;
}

export default class UpdateUserAvatarService {
  public async execute({
    userId,
    avatarFileName,
  }: IUpdateUserAvatar): Promise<Users> {
    const user = await UsersRepository.findId(userId);

    if (!user) {
      throw new AppError('User not found', 404);
    }
    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }
    user.avatar = avatarFileName;
    await UsersRepository.save(user);

    return user;
  }
}
