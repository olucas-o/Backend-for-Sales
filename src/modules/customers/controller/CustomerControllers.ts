import { ListCustomersService } from '../services/listCustumersService';
import { Request, Response } from 'express';
import { ShowCustomerService } from '../services/showCustomersService';
import { CreateCustomerService } from '../services/createCustomersService';
import { UpdateCustomerService } from '../services/updateCustomersService';
import { DeleteCustomerService } from '../services/deleteCustumerServie';

export default class CustomerControllers {
  async index(request: Request, response: Response) {
    const listCustomerService = new ListCustomersService();
    const customers = await listCustomerService.execute();
    return response.json(customers);
  }

  async show(request: Request, response: Response) {
    const showCustomerService = new ShowCustomerService();
    const id = Number(request.params.id);
    const customer = await showCustomerService.execute({ id });
    return response.json(customer);
  }

  async create(req: Request, res: Response) {
    const { name, email } = req.body;
    const createCustomerService = new CreateCustomerService();
    const customer = await createCustomerService.execute({ name, email });
    return res.json(customer);
  }

  async update(request: Request, response: Response) {
    const id = Number(request.params.id);
    const { name, email } = request.body;
    const updateCustomerService = new UpdateCustomerService();
    const customer = await updateCustomerService.execute({ id, name, email });
    return response.json(customer);
  }

  async delete(request: Request, response: Response) {
    const id = Number(request.params.id);
    const deleteCustomerService = new DeleteCustomerService();
    await deleteCustomerService.execute({ id });
    return response.status(204).send();
  }
}
