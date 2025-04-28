import { Customer } from '../database/Customers';
import { customersRepository } from '../database/repositories/custumersRepositoies';

export class ListCustomersService {
  async execute(): Promise<Customer[]> {
    const customers = await customersRepository.find();
    return customers;
  }
}
