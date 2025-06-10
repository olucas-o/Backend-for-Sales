import AppError from '../../../shared/erros/AppError';
import FakeCustomersRepository from '../domains/fakes/FakeCustomerRepositorie';
import { CreateCustomerService } from './createCustomersService';
import { DeleteCustomerService } from './deleteCustumerServie';

describe('DeleteCustomerService', () => {
  it('should be able to delete a customer', async () => {
    const fakeCustomersRepository = new FakeCustomersRepository();
    const createCustomerService = new CreateCustomerService(
      fakeCustomersRepository,
    );
    const deleteCustomerService = new DeleteCustomerService(
      fakeCustomersRepository,
    );

    const customer = await createCustomerService.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
    });

    await deleteCustomerService.execute({ id: customer.id });

    const deletedCustomer = await fakeCustomersRepository.findId(customer.id);

    expect(deletedCustomer).toBeUndefined();
  });

  it('should not be able to delete a non-existing customer', async () => {
    const fakeCustomersRepository = new FakeCustomersRepository();
    const deleteCustomerService = new DeleteCustomerService(
      fakeCustomersRepository,
    );

    await expect(
      deleteCustomerService.execute({ id: 999 }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
