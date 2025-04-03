import Router from 'express';
import productsRouter from '../../../modules/products/routers/productRouter';
import usersRouter from '../../../modules/users/routers/UserRouter';

const router = Router();

router.get('/health', (req, res) => {
  res.json({ message: "Hello dev, I'm alive!" });
});

router.use('/products', productsRouter);
router.use('/users', usersRouter);
export default router;
