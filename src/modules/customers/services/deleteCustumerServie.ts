import { customersRepository } from '../database/repositories/custumersRepositoies';

interface IDeleteCustomerRequest {
  id: number;
}

export class DeleteCustomerService {
  async execute({ id }: IDeleteCustomerRequest): Promise<void> {
    const customer = await customersRepository.findId(id);

    if (!customer) {
      throw new Error('Customer not found');
    }

    await customersRepository.delete(id);
  }
}
