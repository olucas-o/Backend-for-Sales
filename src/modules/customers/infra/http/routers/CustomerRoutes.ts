import express from 'express';
import AuthMiddleware from '../../../../../shared/Middleware/authMiddleware';
import CustomerControllers from '../controller/CustomerControllers';
import {
  CreateCustomerSchema,
  idParamsValidateCustomers,
  UpdateCustomerSchema,
} from '../schemas/CustomerSchema';

const controller = new CustomerControllers();
const CustomerRouter = express.Router();

CustomerRouter.use(AuthMiddleware.execute);
CustomerRouter.get('/', controller.index);
CustomerRouter.get('/:id', idParamsValidateCustomers, controller.show);
CustomerRouter.post('/', CreateCustomerSchema, controller.create);
CustomerRouter.patch(
  '/:id',
  UpdateCustomerSchema,
  idParamsValidateCustomers,
  controller.update,
);
CustomerRouter.delete('/:id', idParamsValidateCustomers, controller.delete);

export default CustomerRouter;
