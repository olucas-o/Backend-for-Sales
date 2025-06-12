import AppError from '../../../shared/erros/AppError';
import FakeCustomersRepository from '../domains/fakes/FakeCustomerRepositorie';
import { CreateCustomerService } from './createCustomersService';
import { UpdateCustomerService } from './updateCustomersService';

describe('UpdateCustomerService', () => {
  let fakeCustomersRepository: FakeCustomersRepository;
  let createCustomerService: CreateCustomerService;
  let updateCustomerService: UpdateCustomerService;

  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();
    createCustomerService = new CreateCustomerService(fakeCustomersRepository);
    updateCustomerService = new UpdateCustomerService(fakeCustomersRepository);
  });

  it('should be able to update a customer', async () => {
    const customer = await createCustomerService.execute({
      name: 'Ex original Name',
      email: 'exoriginal@gmail.com',
    });

    const updatedCustomer = await updateCustomerService.execute({
      id: customer.id,
      name: 'Ex Updated Name',
      email: 'exupdated@gmail.com',
    });

    expect(updatedCustomer.name).toBe('Ex Updated Name');
    expect(updatedCustomer.email).toBe('exupdated@gmail.com');
  });

  it('should not be able to update a non-existing customer', async () => {
    await expect(
      updateCustomerService.execute({
        id: 999,
        name: 'ex Non Existent',
        email: 'exnonexistent@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not update with an email that is already in use by another customer', async () => {
    const customerToUpdate = await createCustomerService.execute({
      name: 'Ex Customer One',
      email: 'excustomerone@gmail.com',
    });

    const otherCustomer = await createCustomerService.execute({
      name: 'Ex Customer Two',
      email: 'excustomertwo@gmail.com',
    });

    await expect(
      updateCustomerService.execute({
        id: customerToUpdate.id,
        name: 'New Name For Customer One',
        email: otherCustomer.email,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the customer with their own email', async () => {
    const customer = await createCustomerService.execute({
      name: 'Ex Original Name',
      email: 'exoriginal@example.com',
    });

    const updatedCustomer = await updateCustomerService.execute({
      id: customer.id,
      name: 'Ex Updated Name',
      email: customer.email,
    });

    expect(updatedCustomer.name).toBe('Ex Updated Name');
    expect(updatedCustomer.email).toBe('exoriginal@example.com');
  });

  it('should propagate an error if the repository fails', async () => {
    jest
      .spyOn(fakeCustomersRepository, 'findId')
      .mockRejectedValueOnce(new Error('Database is down'));

    await expect(
      updateCustomerService.execute({
        id: 1,
        name: 'Ex',
        email: 'ex@gmail.com',
      }),
    ).rejects.toThrow('Database is down');
  });
});
