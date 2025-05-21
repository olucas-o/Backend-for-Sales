import { ICreateCustomer } from '../domains/models/ICreateUser';
import { ICustomersRepository } from '../domains/repositories/ICustumerRepository';
import { Customer } from '../infra/database/entities/Customers';

export class CreateCustomerService {
  constructor(private readonly customersRepository: ICustomersRepository) {}

  public async execute({ name, email }: ICreateCustomer): Promise<Customer> {
    const emailExists = await this.customersRepository.findByEmail(email);

    if (emailExists) {
      throw new Error('Email address already used');
    }

    const customer = await this.customersRepository.create({ name, email });
    return customer;
  }
}
