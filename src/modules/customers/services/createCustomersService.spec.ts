import AppError from '../../../shared/erros/AppError';
import FakeCustomersRepository from '../domains/fakes/FakeCustomerRepositorie';
import { CreateCustomerService } from './createCustomersService';

describe('CreateCustomerService', () => {
  it('should be able to createnew custumer', async () => {
    const fakeCustumerRepositore = new FakeCustomersRepository();
    const createCustomers = new CreateCustomerService(fakeCustumerRepositore);

    const customer = await createCustomers.execute({
      name: 'Ex',
      email: 'ex@gmail.com',
    });

    expect(customer).toHaveProperty('id');
    expect(customer.email).toBe('ex@gmail.com');
  });

  it('This email is already in user', async () => {
    const fakeCustumerRepositore = new FakeCustomersRepository();
    const createCustomers = new CreateCustomerService(fakeCustumerRepositore);

    await createCustomers.execute({
      name: 'Ex',
      email: 'ex@gmail.com',
    });
    await expect(
      createCustomers.execute({
        name: 'Ex',
        email: 'ex@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
