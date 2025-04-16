import Router from 'express';
import productsRouter from '../../../modules/products/routers/productRouter';
import usersRouter from '../../../modules/users/routers/UserRouter';
import sessionRouter from '../../../modules/users/routers/sessionRouter';
import avatarRouter from '../../../modules/users/routers/avatarRouter';

const router = Router();

router.get('/health', (req, res) => {
  res.json({ message: "Hello dev, I'm alive!" });
});

router.use('/products', productsRouter);
router.use('/users', usersRouter);
router.use('/session', sessionRouter);
router.use('/avatar', avatarRouter);

export default router;
