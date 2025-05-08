import { Request, Response } from 'express';
import ListUsersService from '../services/ListProductsService';
import CreateUserService from '../services/createUsers';
import { instanceToInstance } from 'class-transformer';

export default class UserController {
  public async index(_request: Request, response: Response): Promise<void> {
    const listUsersService = new ListUsersService();
    const user = await listUsersService.execute();
    response.json(instanceToInstance(user));
  }

  public async create(request: Request, response: Response): Promise<void> {
    const { name, email, password, avatar = null } = request.body;
    const createUserService = new CreateUserService();
    const user = await createUserService.execute({
      name,
      email,
      password,
      avatar,
    });
    response.json(instanceToInstance(user));
  }
}
