import { Customer } from '../../../../customers/database/entities/Customers';
import { OrderProduct } from '../OrderProducts';
import { AppDataSource } from '../../../../../shared/typeorm/data-source';
import { Order } from '../Orders';

interface ICreateOrder {
  customer: Customer;
  products: ICreateOrderProducts[];
}

export interface ICreateOrderProducts {
  productId: string;
  quantity: number;
  price: number;
}

export const orderRepository = AppDataSource.getRepository(Order).extend({
  async findById(id: number): Promise<Order | null> {
    const order = await this.findOne({
      where: { id },
      relations: ['orderProducts', 'customer'],
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
