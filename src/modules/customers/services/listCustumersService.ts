import { Customer } from '../database/entities/Customers';
import { customersRepository } from '../database/entities/repositories/custumersRepositoies';
import { IPagination } from '../../../shared/interface/pagination';

export default class ListCustomerService {
  async execute(
  page: number = 1,
  limit: number = 10,
  ): Promise<IPagination<Customer>> {
  const [data, total] = await customersRepository.findAndCount({
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
  nextPage: page < totalPages ? page + 1: null,
  prevPage: page > 1? page -1: null,
  } as IPagination<Customer>;
  }
}
