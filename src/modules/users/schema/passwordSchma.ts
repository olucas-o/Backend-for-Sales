import { Joi } from "celebrate";

export const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required()
  });

export const resetPasswordSchema = Joi.object({
  token: Joi.string().required(),
  password: Joi.string().required(),
  passwordConfirmation: Joi.string().valid(Joi.ref('password')).required()
});
