import AppError from '../../../shared/erros/AppError';
import FakeProductsRepository from '../domains/fakes/fakeRepositorieProducts';
import CreateProductService from './CreateProductService';

describe('CreateProductService', () => {
  let fakeProductsRepository: FakeProductsRepository;
  let createProductservice: CreateProductService;

  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();
    createProductservice = new CreateProductService(fakeProductsRepository);
  });

  it('should be able to createnew Product', async () => {
    const product = await createProductservice.execute({
      name: 'ex',
      price: 1,
      quantity: 1,
      description: 'ex',
    });

    expect(product).toHaveProperty('id');
    expect(product.price).toBe(1);
    expect(product.description).toBe('ex');
  });

  it('This name is already in product', async () => {
    await createProductservice.execute({
      name: 'ex',
      price: 1,
      quantity: 1,
      description: 'ex',
    });
    await expect(
      createProductservice.execute({
        name: 'ex',
        price: 1,
        quantity: 1,
        description: 'ex',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
