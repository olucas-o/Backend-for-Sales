import { Router } from 'express';
import  UpdateAvatarController  from '../controller/uploadUserAvatar';
import uploadConfig from '../../../config/upload'
import multer from 'multer';
import AuthMiddleware from '../../../shared/middleware/authMiddleware';

const avatarRouter = Router();
const updateAvatarController = new UpdateAvatarController();
const upload = multer(uploadConfig);

avatarRouter.patch(
  '/',
  AuthMiddleware.execute,
  upload.single('avatar'),
  updateAvatarController.update,
);

export default avatarRouter;
