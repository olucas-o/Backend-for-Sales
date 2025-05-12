import { IUpdateCustomer } from '../domains/models/IUpdateCustomer';
import { Customer } from '../infra/database/entities/Customers';
import { customersRepository } from '../infra/database/entities/repositories/custumersRepositoies';


export class UpdateCustomerService {
  async execute({
    id,
    name,
    email,
  }: IUpdateCustomer): Promise<Customer> {
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
