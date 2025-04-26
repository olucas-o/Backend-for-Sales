import { compare, hash } from 'bcrypt';
import { UsersRepository } from '../database/entities/repositories/userRepositorie';
import { Users } from '../database/entities/Users';

interface IUpdateProfile {
  User_ID: number;
  email: string;
  name: string;
  password: string;
  oldPassword: string;
}
export default class UpdateProfileService {
  async excute({
    User_ID,
    email,
    name,
    password,
    oldPassword,
  }: IUpdateProfile): Promise<Users> {
    const user = await UsersRepository.findId(User_ID);
    if (!user) {
      throw new Error('User not find');
    }
    if (email) {
      const userWithUpdatedEmail = await UsersRepository.findByEmail(email);
      if (userWithUpdatedEmail) {
        throw new Error('Already hast a user its email');
      }
      user.email = email;
    }
    if (password && !oldPassword) {
      throw new Error('Old password is required');
    }

    if (password && oldPassword) {
      const isOldPasswordValid = await compare(oldPassword, user.password);
      if (!isOldPasswordValid) {
        throw new Error('Old password not meet');
      }
      user.password = await hash(password, 10);
    }

    if (name) {
      user.name = name;
    }

    await UsersRepository.save(user);
    return user;
  }
}
