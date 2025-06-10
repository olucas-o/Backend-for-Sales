import FakeCustomersRepository from '../domains/fakes/FakeCustomerRepositorie';
import { Customer } from '../infra/database/entities/Customers';
import ListCustomerService from './listCustumersService';

describe('ListCustomerService', () => {
  it('should be able to list customers with pagination', async () => {
    const fakeCustomersRepository = new FakeCustomersRepository();
    const listCustomerService = new ListCustomerService(
      fakeCustomersRepository,
    );

    const mockCustomerList: Customer[] = [
      {
        id: 6,
        name: 'Customer 6',
        email: 'c6@test.com',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 7,
        name: 'Customer 7',
        email: 'c7@test.com',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 8,
        name: 'Customer 8',
        email: 'c8@test.com',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 9,
        name: 'Customer 9',
        email: 'c9@test.com',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 10,
        name: 'Customer 10',
        email: 'c10@test.com',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];
    const mockTotalCount = 15;

    jest
      .spyOn(fakeCustomersRepository, 'findAndCount')
      .mockResolvedValueOnce([mockCustomerList, mockTotalCount]);

    const page = 2;
    const limit = 5;
    const paginatedResult = await listCustomerService.execute(page, limit);

    expect(paginatedResult.data).toHaveLength(5);
    expect(paginatedResult.data[0].name).toBe('Customer 6');
    expect(paginatedResult.total).toBe(15);
    expect(paginatedResult.currentPage).toBe(2);
    expect(paginatedResult.totalPages).toBe(3);
    expect(paginatedResult.nextPage).toBe(3);
    expect(paginatedResult.prevPage).toBe(1);
  });

  it('should return correct pagination for the first page', async () => {
    const fakeCustomersRepository = new FakeCustomersRepository();
    const listCustomerService = new ListCustomerService(
      fakeCustomersRepository,
    );

    jest
      .spyOn(fakeCustomersRepository, 'findAndCount')
      .mockResolvedValueOnce([[], 15]);

    const paginatedResult = await listCustomerService.execute(1, 5);

    expect(paginatedResult.currentPage).toBe(1);
    expect(paginatedResult.prevPage).toBeNull();
    expect(paginatedResult.nextPage).toBe(2);
  });

  it('should return correct pagination when result is empty', async () => {
    const fakeCustomersRepository = new FakeCustomersRepository();
    const listCustomerService = new ListCustomerService(
      fakeCustomersRepository,
    );

    jest
      .spyOn(fakeCustomersRepository, 'findAndCount')
      .mockResolvedValueOnce([[], 0]);

    const paginatedResult = await listCustomerService.execute();

    expect(paginatedResult.data).toEqual([]);
    expect(paginatedResult.total).toBe(0);
    expect(paginatedResult.totalPages).toBe(0);
    expect(paginatedResult.nextPage).toBeNull();
    expect(paginatedResult.prevPage).toBeNull();
  });

  it('should propagate an error if the repository fails', async () => {
    const fakeCustomersRepository = new FakeCustomersRepository();
    const listCustomerService = new ListCustomerService(
      fakeCustomersRepository,
    );

    jest
      .spyOn(fakeCustomersRepository, 'findAndCount')
      .mockRejectedValueOnce(new Error('Database is offline'));

    await expect(listCustomerService.execute()).rejects.toThrow(
      'Database is offline',
    );
  });
});
