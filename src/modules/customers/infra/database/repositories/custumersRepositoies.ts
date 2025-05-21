import { Repository } from 'typeorm';
import { AppDataSource } from '../../../../../shared/infra/typeorm/data-source';
import { Customer } from '../entities/Customers';
import {
  ICustomersRepository,
  Pagination,
} from '../../../domains/repositories/ICustumerRepository';
import { ICustomer } from '../../../domains/models/IcreateCustumer';
import { ICreateCustomer } from '../../../domains/models/ICreateUser';

export default class customersRepository implements ICustomersRepository {
  private ormRepository: Repository<Customer>;
  constructor() {
    this.ormRepository = AppDataSource.getRepository(Customer);
  }
  async findByEmail(email: string): Promise<ICustomer | null> {
    const customer = await this.ormRepository.findOneBy({ email });
    return customer;
  }
  async create({ name, email }: ICreateCustomer): Promise<ICustomer> {
    const customer = this.ormRepository.create({ name, email });
    await this.ormRepository.save(customer);
    return customer;
  }
  async save(customer: ICustomer): Promise<ICustomer> {
    const savecustomer = await this.ormRepository.save(customer);
    return savecustomer;
  }
  async remove(customer: ICustomer): Promise<void> {
    await this.ormRepository.remove(customer);
  }
  async findId(id: number): Promise<ICustomer | null> {
    const customer = await this.ormRepository.findOneBy({ id });
    return customer;
  }
  async findAndCount({
    take,
    skip,
  }: Pagination): Promise<[ICustomer[], number]> {
    const [customer, total] = await this.ormRepository.findAndCount({
      take,
      skip,
    });
    return [customer, total];
  }
  async findByName(name: string): Promise<ICustomer | null> {
    const customer = await this.ormRepository.findOneBy({ name });
    return customer;
  }
}
