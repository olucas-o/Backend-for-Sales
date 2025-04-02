import { celebrate, Joi } from 'celebrate';

export const createUserSchema = celebrate({
body: Joi.object({
name: Joi.string().required(),
email: Joi.string().email().required(),
password: Joi.string().required()
})
});
