import { Request, Response } from 'express';
import ListProductService from '../Services/ListProductsService';
import ShowProductService from '../Services/ShowProductService';
import CreateProductService from '../Services/CreateProductService';
import UpdateProductService from '../Services/UpdateProductsService';
import DeleteProductService from '../Services/DeleteProductService';

export default class ProductsController {
  public async index(_request: Request, response: Response): Promise<void> {
    const listProductsService = new ListProductService();
    const products = await listProductsService.execute();
    response.json(products);
  }

  public async show(request: Request, response: Response): Promise<void> {
    const { id } = request.params;
    const showProductService = new ShowProductService();
    const product = await showProductService.execute({ id });
    response.json(product);
  }

  public async create(request: Request, response: Response): Promise<void> {
    const { name, price, quantity } = request.body;
    const createProductService = new CreateProductService();
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
    const updateProductService = new UpdateProductService();
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
    const deleteProductService = new DeleteProductService();
    await deleteProductService.execute({ id });
    response.status(204).send([]);
  }
}
