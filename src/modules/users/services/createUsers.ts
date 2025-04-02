import AppError from '../../../shared/erros/AppError';
import { Users } from '../database/entities/Users';
import { UsersRepository } from '../database/entities/repositories/userRepositorie';

interface ICreateProduct {
  name: string;
  email: string;
  password: string;
}

export default class CreateProductService {
  public async execute({
    name,
    email,
    password,
  }: ICreateProduct): Promise<Users> {
    const productExists = await UsersRepository.findByMail(email);

    if (productExists) {
      throw new AppError('There is already one User with this mail', 409);
    }

    const user = UsersRepository.create({
      name,
      email,
      password,
    });

    await UsersRepository.save(user);

    return user;
  }
}

interface ICreateProduct {
  name: string;
  price: number;
  quantity: number;
}
