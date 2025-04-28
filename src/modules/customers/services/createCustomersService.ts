import { Customer } from '../database/Customers';
import { customersRepository } from '../database/repositories/custumersRepositoies';

interface ICreateCustomerRequest {
  name: string;
  email: string;
}

export class CreateCustomerService {
  async execute({ name, email }: ICreateCustomerRequest): Promise<Customer> {
    const emailExists = await customersRepository.findByEmail(email);

    if (emailExists) {
      throw new Error('Email address already used');
    }

    const customer = customersRepository.create({ name, email });
    await customersRepository.save(customer);
    return customer;
  }
}
