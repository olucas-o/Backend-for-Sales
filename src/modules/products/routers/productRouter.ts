import { Router } from 'express';
import ProductsController from '../controller/ProductController';
import {
  idParamValidation,
  updateProductSchema,
  createProductSchema,
} from '../schema/schemaProduct';

const productsRouter = Router();
const productsController = new ProductsController();

productsRouter.get('/', productsController.index);
productsRouter.get('/:id', idParamValidation, productsController.show);
productsRouter.post('/', createProductSchema, productsController.create);
productsRouter.put('/:id', updateProductSchema, productsController.update);
productsRouter.delete('/:id', idParamValidation, productsController.delete);

export default productsRouter;
