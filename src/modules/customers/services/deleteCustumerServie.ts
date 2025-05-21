import { ICustomersRepository } from '../domains/repositories/ICustumerRepository';

interface IDeleteCustomerRequest {
  id: number;
}

export class DeleteCustomerService {
  constructor(private readonly customersRepository: ICustomersRepository) {}

  async execute({ id }: IDeleteCustomerRequest): Promise<void> {
    const customer = await this.customersRepository.findId(id);

    if (!customer) {
      throw new Error('Customer not found');
    }

    await this.customersRepository.remove(customer);
  }
}
