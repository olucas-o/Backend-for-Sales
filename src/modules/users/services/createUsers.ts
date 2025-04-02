import AppError from '../../../shared/erros/AppError';
import { Users } from '../database/entities/Users';
import { UsersRepository } from '../database/entities/repositories/userRepositorie';
import bcrypt from 'bcrypt';

interface ICreateUser {
  name: string;
  email: string;
  password: string;
}

export default class CreateUserService {
  public async execute({ name, email, password }: ICreateUser): Promise<Users> {
    const emailExists = await UsersRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('There is already one User with this email', 409);
    }

    const nameExists = await UsersRepository.findByName(name);

    if (nameExists) {
      throw new AppError('There is already one User with this name', 409);
    }

    const passHash = await bcrypt.hash(password, 10);
    const user = UsersRepository.create({
      name,
      email,
      password: passHash,
    });

    await UsersRepository.save(user);

    return user;
  }
}
