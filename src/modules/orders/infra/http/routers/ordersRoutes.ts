import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  createOrderValidate,
  idParamsValidate,
} from '../schemas/ordersSchemas';
import OrderControllers from '../controller/orderController';
import authMiddleware from '../../../../../shared/middleware/authMiddleware';

const ordersRouter = Router();
const orderController = new OrderControllers();

ordersRouter.use(authMiddleware.execute);

ordersRouter.get('/:id', celebrate(idParamsValidate), orderController.show);
ordersRouter.post('/', celebrate(createOrderValidate), orderController.create);

export default ordersRouter;
