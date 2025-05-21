import { ShowOrderService } from '../../../services/showOrderService';
import { CreateOrderService } from '../../../services/CreateOrderService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class OrderControllers {
  async create(request: Request, response: Response): Promise<void> {
    const { customerId, products } = request.body;
    const createCustomerService = container.resolve(CreateOrderService);
    const customer = await createCustomerService.execute({
      customerId,
      products,
    });
    response.json(customer);
  }

  async show(request: Request, response: Response): Promise<void> {
    const showOrder = container.resolve(ShowOrderService);
    const id = request.params.id;
    const customer = await showOrder.execute(id);
    response.json(customer);
  }
}
