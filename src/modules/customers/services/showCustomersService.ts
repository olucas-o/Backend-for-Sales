import { Customer } from '../database/Customers';
import { customersRepository } from '../database/repositories/custumersRepositoies';

interface IShowCustomerRequest {
  id: number;
}

export class ShowCustomerService {
  async execute({ id }: IShowCustomerRequest): Promise<Customer> {
    const customer = await customersRepository.findId(id);

    if (!customer) {
      throw new Error('Customer not found');
    }

    return customer;
  }
}
