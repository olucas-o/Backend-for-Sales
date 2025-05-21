import { request, Request, Response } from 'express';
import ListProductService from '../../../Services/ListProductsService';
import ShowProductService from '../../../Services/ShowProductService';
import CreateProductService from '../../../Services/CreateProductService';
import UpdateProductService from '../../../Services/UpdateProductsService';
import DeleteProductService from '../../../Services/DeleteProductService';
import { container } from 'tsyringe';

export default class ProductsController {
  public async index(_request: Request, response: Response): Promise<void> {
    const page = parseInt(request.query.page as string) || 1;
    const limit = parseInt(request.query.limit as string) || 10;
    const listProductsService = container.resolve(ListProductService);
    const products = await listProductsService.execute(page, limit);
    response.json(products);
  }

  public async show(request: Request, response: Response): Promise<void> {
    const { id } = request.params;
    const showProductService = container.resolve(ShowProductService);
    const product = await showProductService.execute({ id });
    response.json(product);
  }

  public async create(request: Request, response: Response): Promise<void> {
    const { name, price, quantity } = request.body;
    const createProductService = container.resolve(CreateProductService);
    const product = await createProductService.execute({
      name,
      price,
      quantity,
    });
    response.json(product);
  }

  public async update(request: Request, response: Response): Promise<void> {
    const { id } = request.params;
    const { name, price, quantity } = request.body;
    const updateProductService = container.resolve(UpdateProductService);
    const product = await updateProductService.execute({
      id,
      name,
      price,
      quantity,
    });
    response.json(product);
  }

  public async delete(request: Request, response: Response): Promise<void> {
    const { id } = request.params;
    const deleteProductService = container.resolve(DeleteProductService);
    await deleteProductService.execute({ id });
    response.status(204).send([]);
  }
}
