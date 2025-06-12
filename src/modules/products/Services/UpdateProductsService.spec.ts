import AppError from '../../../shared/erros/AppError';
import FakeProductsRepository from '../domains/fakes/fakeRepositorieProducts';
import CreateProductService from './CreateProductService';
import UpdateProductService from './UpdateProductsService';

jest.mock('../../../shared/cache/RedisCache', () => {
  return {
    RedisCache: jest.fn().mockImplementation(() => {
      return {
        save: jest.fn(),
        recover: jest.fn(),
        invalidade: jest.fn(),
      };
    }),
  };
});

describe('UpdateProductService', () => {
  let fakeProductsRepository: FakeProductsRepository;
  let createProductService: CreateProductService;
  let updateProductService: UpdateProductService;

  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();
    createProductService = new CreateProductService(fakeProductsRepository);
    updateProductService = new UpdateProductService(fakeProductsRepository);
  });

  it('should be able to update a product', async () => {
    const product = await createProductService.execute({
      name: 'Original Product Name',
      price: 100,
      quantity: 10,
      description: 'Original description.',
    });

    const updatedProduct = await updateProductService.execute({
      id: String(product.id),
      name: 'Updated Product Name',
      price: 150.5,
      quantity: 5,
    });

    expect(updatedProduct.name).toBe('Updated Product Name');
    expect(updatedProduct.price).toBe(150.5);
    expect(updatedProduct.quantity).toBe(5);
  });

  it('should throw an error if the product does not exist', async () => {
    await expect(
      updateProductService.execute({
        id: '999',
        name: 'Non Existent Product',
        price: 10,
        quantity: 10,
      }),
    ).rejects.toThrow('Product not found.');
  });

  it('should not update with a name that is already in use by another product', async () => {
    const productToUpdate = await createProductService.execute({
      name: 'Product One',
      price: 10,
      quantity: 10,
      description: 'First product.',
    });

    const otherProduct = await createProductService.execute({
      name: 'Product Two',
      price: 20,
      quantity: 20,
      description: 'Second product.',
    });

    await expect(
      updateProductService.execute({
        id: String(productToUpdate.id),
        name: otherProduct.name,
        price: productToUpdate.price,
        quantity: productToUpdate.quantity,
      }),
    ).rejects.toThrow('Already has a Product with this name');
  });

  it('should be able to update the product with its own name', async () => {
    const product = await createProductService.execute({
      name: 'Unique Product Name',
      price: 50,
      quantity: 5,
      description: 'A unique product.',
    });

    const updatedProduct = await updateProductService.execute({
      id: String(product.id),
      name: 'Unique Product Name',
      price: 55.5,
      quantity: 4,
    });

    expect(updatedProduct.price).toBe(55.5);
    expect(updatedProduct.quantity).toBe(4);
  });

  it('should propagate an error if the repository fails', async () => {
    jest
      .spyOn(fakeProductsRepository, 'findId')
      .mockRejectedValueOnce(new Error('Database is down'));

    await expect(
      updateProductService.execute({
        id: '1',
        name: 'Any Product',
        price: 1,
        quantity: 1,
      }),
    ).rejects.toThrow('Database is down');
  });
});
