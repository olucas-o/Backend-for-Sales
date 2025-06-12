import FakeProductsRepository from '../domains/fakes/fakeRepositorieProducts';
import { Product } from '../infra/database/entities/Product';
import ListProductService from './ListProductsService';

describe('ListProductService', () => {
  let fakeProductsRepository: FakeProductsRepository;
  let listProductService: ListProductService;

  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();
    listProductService = new ListProductService(fakeProductsRepository);
  });

  it('should be able to list products with pagination', async () => {
    const mockProductList: Product[] = [
      {
        id: 1,
        name: 'Product 1',
        price: 10.0,
        quantity: 100,
        description: null,
        order_products: [],
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        name: 'Product 2',
        price: 20.0,
        quantity: 200,
        description: null,
        order_products: [],
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 3,
        name: 'Product 3',
        price: 30.0,
        quantity: 300,
        description: null,
        order_products: [],
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];
    const mockTotalCount = 25;

    jest
      .spyOn(fakeProductsRepository, 'findAndCount')
      .mockResolvedValueOnce([mockProductList, mockTotalCount]);

    const page = 3;
    const limit = 3;
    const paginatedResult = await listProductService.execute(page, limit);

    expect(fakeProductsRepository.findAndCount).toHaveBeenCalledWith({
      take: limit,
      skip: (page - 1) * limit,
    });
    expect(paginatedResult.data).toHaveLength(3);
    expect(paginatedResult.data[0].name).toBe('Product 1');
    expect(paginatedResult.total).toBe(25);
    expect(paginatedResult.perPage).toBe(3);
    expect(paginatedResult.currentPage).toBe(3);
    expect(paginatedResult.totalPages).toBe(9);
    expect(paginatedResult.nextPage).toBe(4);
    expect(paginatedResult.prevPage).toBe(2);
  });

  it('should return correct pagination for the first page', async () => {
    jest
      .spyOn(fakeProductsRepository, 'findAndCount')
      .mockResolvedValueOnce([[], 15]);

    const paginatedResult = await listProductService.execute(1, 5);

    expect(paginatedResult.currentPage).toBe(1);
    expect(paginatedResult.prevPage).toBeNull();
    expect(paginatedResult.nextPage).toBe(2);
    expect(paginatedResult.totalPages).toBe(3);
  });

  it('should return correct pagination when result is empty', async () => {
    jest
      .spyOn(fakeProductsRepository, 'findAndCount')
      .mockResolvedValueOnce([[], 0]);

    const paginatedResult = await listProductService.execute();

    expect(paginatedResult.data).toEqual([]);
    expect(paginatedResult.total).toBe(0);
    expect(paginatedResult.totalPages).toBe(0);
    expect(paginatedResult.nextPage).toBeNull();
    expect(paginatedResult.prevPage).toBeNull();
  });

  it('should propagate an error if the repository fails', async () => {
    jest
      .spyOn(fakeProductsRepository, 'findAndCount')
      .mockRejectedValueOnce(new Error('Database is offline'));

    await expect(listProductService.execute()).rejects.toThrow(
      'Database is offline',
    );
  });
});
