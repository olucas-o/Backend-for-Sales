import AppError from '../../../shared/erros/AppError';
import { inject, injectable } from 'tsyringe';
import { ICustomersRepository } from '../domains/repositories/ICustumerRepository';
import { Customer } from '../infra/database/entities/Customers';
interface IShowCustomerRequest {
  id: number;
}

@injectable()
export class ShowCustomerService {
  constructor(
    @inject('CustomersRepository')
    private readonly customersRepository: ICustomersRepository,
  ) {}

  async execute({ id }: IShowCustomerRequest): Promise<Customer> {
    const customer = await this.customersRepository.findId(id);

    if (!customer) {
      throw new AppError('Customer not found');
    }

    return customer;
  }
}
