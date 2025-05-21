import { container } from 'tsyringe';
import { ICustomersRepository } from '../../modules/customers/domains/repositories/ICustumerRepository';
import customersRepository from '../../modules/customers/infra/database/repositories/custumersRepositoies';

container.registerSingleton<ICustomersRepository>( 'CustomersRepository', customersRepository);
