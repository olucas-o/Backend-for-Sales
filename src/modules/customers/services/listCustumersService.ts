import { Customer } from '../database/entities/Customers';
import { customersRepository } from '../database/entities/repositories/custumersRepositoies';

export class ListCustomersService {
  async execute(): Promise<Customer[]> {
    const customers = await customersRepository.find();
    return customers;
  }
}
