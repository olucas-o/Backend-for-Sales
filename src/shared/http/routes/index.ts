import Router from 'express';
import productsRouter from '../../../modules/products/routers/productRouter';

const router = Router();

router.get('/health', (req, res) => {
  res.json({ message: "Hello dev, I'm alive!" });
});

router.use('/products', productsRouter);
export default router;
