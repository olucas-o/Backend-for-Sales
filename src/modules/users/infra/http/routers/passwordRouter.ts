import { Router } from 'express';
import ForgotPasswordController from '../controller/ForgotPasswordController';
import ResetPasswordController from '../controller/ResetPasswordController';
import {
  forgotPasswordSchema,
  resetPasswordSchema,
} from '../schema/passwordSchma';

const passwordRouter = Router();
const passwordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordRouter.post('/forgot', forgotPasswordSchema, passwordController.create);

passwordRouter.post(
  '/reset',
  resetPasswordSchema,
  resetPasswordController.create,
);

export default passwordRouter;
