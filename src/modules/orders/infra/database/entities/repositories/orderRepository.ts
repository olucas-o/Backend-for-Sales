import { Repository } from 'typeorm';
import { AppDataSource } from '../../../../../../shared/infra/typeorm/data-source';
import { Customer } from '../../../../../customers/infra/database/entities/Customers';
import { IOrder } from '../../../../domains/models/IOrder';
import { IOrderRepository } from '../../../../domains/repositories/IOrderRpository';
import { Order } from '../Orders';

export interface ICreateOrder {
  customer: Customer;
  products: ICreateOrderProducts[];
}

export interface ICreateOrderProducts {
  productsId: number;
  quantity: number;
  price: number;
}

export default class ordersRepository implements IOrderRepository {
  private ormRepository: Repository<Order>;
  constructor(){this.ormRepository = AppDataSource.getRepository(Order)}
  async createOrder({ customer, products }: ICreateOrder): Promise<Order> {
    const order = this.ormRepository.create({
      customer,
      order_products: products,
    });
    await this.save(order);
    return order;
  }
  async findById(id: number): Promise<Order | null> {
    const order = await this.ormRepository.findOne({
      where: { id },
      relations: ['order_products', 'customer'],
    });
    return order;
  }
  async remove(order: IOrder): Promise<void> {
    await this.ormRepository.remove(order)
  }
  async save(order: IOrder): Promise<IOrder> {
    const saveorder= await this.ormRepository.save(order)
    return saveorder
  }
}
