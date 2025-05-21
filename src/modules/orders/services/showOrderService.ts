import AppError from '../../../shared/erros/AppError';
import { IOrderRepository } from '../domains/repositories/IOrderRpository';
import { Order } from '../infra/database/entities/Orders';

export class ShowOrderService {
  constructor(private readonly orderRepository: IOrderRepository) {}
  public async execute(id: string): Promise<Order> {
    const order = await this.orderRepository.findById(Number(id));

    if (!order) {
      throw new AppError('Order not found', 404);
    }

    return order;
  }
}
