import { AppDataSource } from '../../../../../../shared/infra/typeorm/data-source';
import { Customer } from '../../../../../customers/infra/database/entities/Customers';
import { Order } from '../Orders';

interface ICreateOrder {
  customer: Customer;
  products: ICreateOrderProducts[];
}

export interface ICreateOrderProducts {
  productsId: number;
  quantity: number;
  price: number;
}

export const orderRepository = AppDataSource.getRepository(Order).extend({
  async findById(id: number): Promise<Order | null> {
    const order = await this.findOne({
      where: { id },
      relations: ['order_products', 'customer'],
    });
    return order;
  },
  async createOrder({ customer, products }: ICreateOrder): Promise<Order> {
    const order = this.create({
      customer,
      order_products: products,
    });
    await this.save(order);
    return order;
  },
});
