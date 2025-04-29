import { celebrate, Joi, Segments } from 'celebrate';

export const idParamsValidateCustomers = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().required(),
  },
});

export const CreateCustomerSchema = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
  },
});

export const UpdateCustomerSchema = celebrate({
  [Segments.BODY]: {
    name: Joi.string().optional(),
    email: Joi.string().email().optional(),
  },
});
