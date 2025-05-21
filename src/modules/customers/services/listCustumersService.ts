import { IPagination } from '../../../shared/interface/pagination';
import { ICustomersRepository } from '../domains/repositories/ICustumerRepository';
import { Customer } from '../infra/database/entities/Customers';

export default class ListCustomerService {
  constructor(private readonly customersRepository: ICustomersRepository) {}
  async execute(
    page: number = 1,
    limit: number = 10,
  ): Promise<IPagination<Customer>> {
    const [data, total] = await this.customersRepository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
    });
    const totalPages = Math.ceil(total / limit);
    return {
      data,
      total,
      perPage: limit,
      currentPage: page,
      totalPages: totalPages,
      nextPage: page < totalPages ? page + 1 : null,
      prevPage: page > 1 ? page - 1 : null,
    } as IPagination<Customer>;
  }
}
