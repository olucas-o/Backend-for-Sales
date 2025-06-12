import AppError from '../../../shared/erros/AppError';
import FakeCustomersRepository from '../domains/fakes/FakeCustomerRepositorie';
import { CreateCustomerService } from './createCustomersService';
import { DeleteCustomerService } from './deleteCustumerServie';

describe('DeleteCustomerService', () => {
  let fakeCustomersRepository: FakeCustomersRepository;
  let createCustomerService: CreateCustomerService;
  let deleteCustomerService: DeleteCustomerService;
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();
    createCustomerService = new CreateCustomerService(fakeCustomersRepository);
    deleteCustomerService = new DeleteCustomerService(fakeCustomersRepository);
  });
  it('should be able to delete a customer', async () => {
    const customer = await createCustomerService.execute({
      name: 'ex',
      email: 'ex@gmail.com',
    });

    await deleteCustomerService.execute({ id: customer.id });

    const deletedCustomer = await fakeCustomersRepository.findId(customer.id);

    expect(deletedCustomer).toBeUndefined();
  });

  it('should not be able to delete a non-existing customer', async () => {
    await expect(
      deleteCustomerService.execute({ id: 999 }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
