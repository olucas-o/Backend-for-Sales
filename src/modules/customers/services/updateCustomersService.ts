import { inject, injectable } from 'tsyringe';
import { IUpdateCustomer } from '../domains/models/IUpdateCustomer';
import { ICustomersRepository } from '../domains/repositories/ICustumerRepository';
import { Customer } from '../infra/database/entities/Customers';

@injectable()
export class UpdateCustomerService {
  constructor(
    @inject('CustomersRepository')
    private readonly customersRepository: ICustomersRepository,
  ) {}

  async execute({ id, name, email }: IUpdateCustomer): Promise<Customer> {
    const customer = await this.customersRepository.findId(id);

    if (!customer) {
      throw new Error('Customer not found');
    }

    const emailExists = await this.customersRepository.findByEmail(email);

    if (emailExists && emailExists.id !== customer.id) {
      throw new Error('There is already one customer with this email');
    }

    customer.name = name;
    customer.email = email;

    await this.customersRepository.save(customer);

    return customer;
  }
}
