import AppError from '../../../shared/erros/AppError';
import bcrypt from 'bcrypt';
import { Users } from '../infra/database/entities/Users';
import { UsersRepository } from '../infra/database/repositories/userRepositorie';
import { ICreateUser } from '../domains/models/ICreateUser';

export default class CreateUserService {
  public async execute({
    name,
    email,
    password,
    avatar,
  }: ICreateUser): Promise<Users> {
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
      avatar,
    });

    await UsersRepository.save(user);

    return user;
  }
}
