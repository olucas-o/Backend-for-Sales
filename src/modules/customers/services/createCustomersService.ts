import { ICreateCustomer } from '../domains/models/ICreateUser';
import { Customer } from '../infra/database/entities/Customers';
import { customersRepository } from '../infra/database/entities/repositories/custumersRepositoies';



export class CreateCustomerService {
  async execute({ name, email }: ICreateCustomer): Promise<Customer> {
    const emailExists = await customersRepository.findByEmail(email);

    if (emailExists) {
      throw new Error('Email address already used');
    }

    const customer = customersRepository.create({ name, email });
    await customersRepository.save(customer);
    return customer;
  }
}
