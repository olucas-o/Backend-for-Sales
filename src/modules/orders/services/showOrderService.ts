import AppError from '../../../shared/erros/AppError';
import { Order } from '../database/entities/Orders';
import { orderRepository } from '../database/entities/repositories/orderRepository';

export class ShowOrderService {
  public async execute(id: string): Promise<Order> {
    const order = await orderRepository.findById(Number(id));

    if (!order) {
      throw new AppError('Order not found', 404);
    }

    return order;
  }
}
