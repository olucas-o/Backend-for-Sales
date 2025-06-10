import AppError from '../../../shared/erros/AppError';
import { inject, injectable } from 'tsyringe';
import { ICustomersRepository } from '../domains/repositories/ICustumerRepository';

interface IDeleteCustomerRequest {
  id: number;
}

@injectable()
export class DeleteCustomerService {
  constructor(
    @inject('CustomersRepository')
    private readonly customersRepository: ICustomersRepository,
  ) {}

  async execute({ id }: IDeleteCustomerRequest): Promise<void> {
    const customer = await this.customersRepository.findId(id);

    if (!customer) {
      throw new AppError('Customer not found');
    }

    await this.customersRepository.remove(customer);
  }
}
