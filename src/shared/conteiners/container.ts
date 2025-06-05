import { container } from 'tsyringe';
import { ICustomersRepository } from '../../modules/customers/domains/repositories/ICustumerRepository';
import customersRepository from '../../modules/customers/infra/database/repositories/custumersRepositoies';
import { IOrderRepository } from '../../modules/orders/domains/repositories/IOrderRpository';
import ordersRepository from '../../modules/orders/infra/database/entities/repositories/orderRepository';
import productsRepository from '../../modules/products/infra/database/Repositiries/ProductsRepository';
import { IProductsRepository } from '../../modules/products/domains/repositories/IProductsRepository';

container.registerSingleton<ICustomersRepository>(
  'CustomersRepository',
  customersRepository,
);
container.registerSingleton<IOrderRepository>(
  'OrderRepository',
  ordersRepository,
);
container.registerSingleton<IProductsRepository>('ProductsRepository', productsRepository
);
