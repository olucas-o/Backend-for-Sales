import { Customer } from '../infra/database/entities/Customers';
import { customersRepository } from '../infra/database/entities/repositories/custumersRepositoies';

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
