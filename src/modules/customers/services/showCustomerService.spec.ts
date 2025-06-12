import AppError from '../../../shared/erros/AppError';
import FakeCustomersRepository from '../domains/fakes/FakeCustomerRepositorie';
import { CreateCustomerService } from './createCustomersService';
import { ShowCustomerService } from './showCustomersService';

describe('ShowCustomerService', () => {
  let fakeCustumerRepository: FakeCustomersRepository;
  let createCustumerervice: CreateCustomerService;
  let showCustumerervice: ShowCustomerService;
  beforeEach(() => {
    fakeCustumerRepository = new FakeCustomersRepository();
    createCustumerervice = new CreateCustomerService(fakeCustumerRepository);
    showCustumerervice = new ShowCustomerService(fakeCustumerRepository);
  });
  it('should be able to show a customer', async () => {
    const createdCustomer = await createCustumerervice.execute({
      name: 'Ex',
      email: 'ex@gmail.com',
    });

    const customer = await showCustumerervice.execute({
      id: createdCustomer.id,
    });

    expect(customer.name).toBe('Ex');
    expect(customer.id).toBe(createdCustomer.id);
  });

  it('should not be able to show a non-existing customer', async () => {
    await expect(
      showCustumerervice.execute({ id: 999 }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should propagate an error if the repository fails', async () => {
    const fakeCustomersRepository = new FakeCustomersRepository();
    const showCustomerService = new ShowCustomerService(
      fakeCustomersRepository,
    );

    jest
      .spyOn(fakeCustomersRepository, 'findId')
      .mockRejectedValueOnce(new Error('Database Failure'));

    await expect(showCustomerService.execute({ id: 1 })).rejects.toThrow(
      'Database Failure',
    );
  });
});
