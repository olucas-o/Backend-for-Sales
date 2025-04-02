import { Request, Response } from 'express';
import ListUsersService from '../services/ListProductsService';
import ShowUserService from '../services/showUserService';
import CreateUserService from '../services/createUsers';
import UpdateUserService from '../services/updateService';
import DeleteUserService from '../services/DeleteUserService';

export default class UserController {
  public async index(_request: Request, response: Response): Promise<void> {
    const listUsersService = new ListUsersService();
    const user = await listUsersService.execute();
    response.json(user);
  }

  /*public async show(request: Request, response: Response): Promise<void> {
    const { id } = request.params;
    const showUserService = new ShowUserService();
    const user = await showUserService.execute({ id });
    response.json(user);
  }*/

  public async create(request: Request, response: Response): Promise<void> {
    const { name, email, password } = request.body;
    const createUserService = new CreateUserService();
    const user = await createUserService.execute({
      name,
      email,
      password,
    });
    response.json(user);
  }

  /*public async update(request: Request, response: Response): Promise<void> {
    const { id } = request.params;
    const { name, email, password } = request.body;
    const updateUserService = new UpdateUserService();
    const user = await UpdateUserService.execute({
      id,
      name,
      email,
      password,
    });
    response.json(user);
  }*/

  /*public async delete(request: Request, response: Response): Promise<void> {
    const { id } = request.params;
    const deleteProductService = new DeleteUserService();
    await deleteProductService.execute({ id });
    response.status(204).send([]);
  }*/
}
