import AppError from '../../../shared/erros/AppError';
import FakeProductsRepository from '../domains/fakes/fakeRepositorieProducts';
import DeleteProductService from './DeleteProductService';
import CreateProductService from './CreateProductService';

describe('DeleteProductService', () => {
  let fakeProductsRepository: FakeProductsRepository;
  let createProductservice: CreateProductService;
  let deleteProductService: DeleteProductService;

  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();
    createProductservice = new CreateProductService(fakeProductsRepository);
    deleteProductService = new DeleteProductService(fakeProductsRepository);
  });

  it('Should be to delete Product', async () => {
    const product = await createProductservice.execute({
      name: 'ex',
      price: 1,
      quantity: 1,
      description: 'ex',
    });

    await deleteProductService.execute({ id: product.id });

    const deleteProduct = await fakeProductsRepository.findId(product.id);

    expect(deleteProduct).toBeUndefined();
  });

  it('should not able to delete a non-existing product', async () => {
    await expect(
      deleteProductService.execute({ id: 999 }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
