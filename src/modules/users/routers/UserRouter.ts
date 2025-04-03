import { Router } from 'express';
import UserController from '../controller/userController';
import { createUserSchema } from '../schema/UserSchema';

const usersRouter = Router();
const userController = new UserController();

usersRouter.get('/', userController.index);
usersRouter.post('/', createUserSchema, userController.create);

export default usersRouter;
