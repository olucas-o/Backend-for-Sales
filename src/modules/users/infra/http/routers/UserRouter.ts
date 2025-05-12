import { Router } from 'express';
import UserController from '../controller/userController';
import { createUserSchema } from '../schema/UserSchema';
import AuthMiddleware from '../../../../../shared/middleware/authMiddleware';

const usersRouter = Router();
const userController = new UserController();

usersRouter.get('/', AuthMiddleware.execute, userController.index);
usersRouter.post('/', createUserSchema, userController.create);

export default usersRouter;
