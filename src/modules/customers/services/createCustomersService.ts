import AppError from '../../../shared/erros/AppError';
import { inject, injectable } from 'tsyringe';
import { ICreateCustomer } from '../domains/models/ICreateUser';
import { ICustomersRepository } from '../domains/repositories/ICustumerRepository';
import { Customer } from '../infra/database/entities/Customers';

@injectable()
export class CreateCustomerService {
  constructor(
    @inject('CustomersRepository')
    private readonly customersRepository: ICustomersRepository,
  ) {}

  public async execute({ name, email }: ICreateCustomer): Promise<Customer> {
    const emailExists = await this.customersRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email address already used');
    }

    const customer = await this.customersRepository.create({ name, email });
    return customer;
  }
}
