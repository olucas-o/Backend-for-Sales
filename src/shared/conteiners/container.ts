import { container } from 'tsyringe';
import { ICustomersRepository } from '../../modules/customers/domains/repositories/ICustumerRepository';
import customersRepository from '../../modules/customers/infra/database/repositories/custumersRepositoies';
import { IOrderRepository } from '../../modules/orders/domains/repositories/IOrderRpository';
import ordersRepository from '../../modules/orders/infra/database/entities/repositories/orderRepository';

container.registerSingleton<ICustomersRepository>( 'CustomersRepository', customersRepository);
container.registerSingleton<IOrderRepository>('OrderRepository', ordersRepository)
