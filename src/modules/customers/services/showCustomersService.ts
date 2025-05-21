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
      throw new Error('Customer not found');
    }

    return customer;
  }
}
