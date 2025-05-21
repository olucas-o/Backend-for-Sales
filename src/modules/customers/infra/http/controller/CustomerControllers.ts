import { Request, Response } from 'express';
import { ShowCustomerService } from '../../../services/showCustomersService';
import { CreateCustomerService } from '../../../services/createCustomersService';
import { UpdateCustomerService } from '../../../services/updateCustomersService';
import { DeleteCustomerService } from '../../../services/deleteCustumerServie';
import ListCustomerService from '../../../services/listCustumersService';
import { container } from 'tsyringe';

export default class CustomerControllers {
  async index(request: Request, response: Response): Promise<void> {
    const page = parseInt(request.query.page as string) || 1;
    const limit = parseInt(request.query.limit as string) || 10;
    const listCustomerService = container.resolve(ListCustomerService);
    const customers = await listCustomerService.execute(page, limit);
    response.json(customers);
  }

  async show(request: Request, response: Response): Promise<void> {
    const showCustomerService = container.resolve(ShowCustomerService);
    const id = Number(request.params.id);
    const customer = await showCustomerService.execute({ id });
    response.json(customer);
  }

  async create(request: Request, response: Response): Promise<void> {
    const { name, email } = request.body;
    const createCustomerService = container.resolve(CreateCustomerService)
    const customer = await createCustomerService.execute({ name, email });
    response.json(customer);
  }

  async update(request: Request, response: Response): Promise<void> {
    const id = Number(request.params.id);
    const { name, email } = request.body;
    const updateCustomerService = container.resolve(UpdateCustomerService);
    const customer = await updateCustomerService.execute({ id, name, email });
    response.json(customer);
  }

  async delete(request: Request, response: Response): Promise<void> {
    const id = Number(request.params.id);
    const deleteCustomerService = container.resolve(DeleteCustomerService);
    await deleteCustomerService.execute({ id });
    response.status(204).send();
  }
}
