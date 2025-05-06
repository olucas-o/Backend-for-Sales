import { Joi, Segments } from 'celebrate';

export const idParamsValidate = {
  [Segments.PARAMS]: {
    id: Joi.number().required(),
  },
};

export const createOrderValidate = {
  [Segments.BODY]: {
    customerId: Joi.number().required(),
    products: Joi.array().required(),
  },
};
