import { Customer } from '../database/Customers';
import { customersRepository } from '../database/repositories/custumersRepositoies';

interface IUpdateCustomerRequest {
  id: number;
  name: string;
  email: string;
}

export class UpdateCustomerService {
  async execute({
    id,
    name,
    email,
  }: IUpdateCustomerRequest): Promise<Customer> {
    const customer = await customersRepository.findId(id);

    if (!customer) {
      throw new Error('Customer not found');
    }

    const emailExists = await customersRepository.findByEmail(email);

    if (emailExists && emailExists.id !== customer.id) {
      throw new Error('There is already one customer with this email');
    }

    customer.name = name;
    customer.email = email;

    await customersRepository.save(customer);

    return customer;
  }
}
