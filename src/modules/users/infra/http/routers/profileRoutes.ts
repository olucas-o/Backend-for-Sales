import { Router } from 'express';
import ProfileController from '../controller/ShowProfileController';
import { updateUserSchema } from '../schema/updateuserSchema';
import AuthMiddleware from '../../../../../shared/middleware/authMiddleware';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(AuthMiddleware.execute);
profileRouter.get('/', profileController.show);
profileRouter.patch('/', updateUserSchema, profileController.update);

export default profileRouter;
