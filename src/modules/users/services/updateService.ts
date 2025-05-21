import bcrpty from 'bcrypt';
import { UsersRepository } from '../infra/database/repositories/userRepositorie';
import { Users } from '../infra/database/entities/Users';
import { IUpdateUser } from '../domains/models/IUpdateUser';

export default class UpdateUserService {
  async execute({ id, name, email, password }: IUpdateUser): Promise<Users> {
    const userExists = await UsersRepository.findId(id);
    if (!userExists) {
      throw new Error('User not found.');
    }
    if (name) {
      const userWithSameName = await UsersRepository.findByName(name);
      if (userWithSameName && userWithSameName.id !== id) {
        throw new Error('Already has a User with this name');
      }
    }

    if (email) {
      const userWithSameEmail = await UsersRepository.findByEmail(email);
      if (userWithSameEmail) {
        throw new Error('Your user already this email');
      }
    }
    const passHash = await bcrpty.hash(password, 10);
    if (name) userExists.name = name;
    if (email) userExists.email = email;
    if (password) userExists.password = passHash;

    const updatedUser = await UsersRepository.save(userExists);

    return updatedUser;
  }
}
