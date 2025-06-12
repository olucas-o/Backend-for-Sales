import AppError from '../../../shared/erros/AppError';
import FakeProductsRepository from '../domains/fakes/fakeRepositorieProducts';
import CreateProductService from './CreateProductService';
import ShowProductService from './ShowProductService';

describe('ShowProductService', () => {
  let fakeProductsRepository: FakeProductsRepository;
  let createProductService: CreateProductService;
  let showProductService: ShowProductService;

  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();
    createProductService = new CreateProductService(fakeProductsRepository);
    showProductService = new ShowProductService(fakeProductsRepository);
  });
  it('should be able to show a product', async () => {
    const createdProduct = await createProductService.execute({
      name: 'ex',
      price: 1,
      quantity: 1,
      description: 'ex',
    });

    const product = await showProductService.execute({
      id: String(createdProduct.id),
    });

    expect(product.name).toBe('ex');
    expect(product.id).toBe(createdProduct.id);
  });

  it('should not be able to show a non-existing product', async () => {
    await expect(
      showProductService.execute({ id: '999' }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should propagate an error if the repository fails', async () => {
    jest
      .spyOn(fakeProductsRepository, 'findId')
      .mockRejectedValueOnce(new Error('Database Failure'));

    await expect(showProductService.execute({ id: '1' })).rejects.toThrow(
      'Database Failure',
    );
  });
});
