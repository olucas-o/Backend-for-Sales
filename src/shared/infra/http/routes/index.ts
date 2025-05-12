import Router from 'express';
import productsRouter from '../../../../modules/products/infra/http/routers/productRouter';
import usersRouter from '../../../../modules/users/infra/http/routers/UserRouter';
import sessionRouter from '../../../../modules/users/infra/http/routers/sessionRouter';
import avatarRouter from '../../../../modules/users/infra/http/routers/avatarRouter';
import passwordRouter from '../../../../modules/users/infra/http/routers/passwordRouter';
import profileRouter from '../../../../modules/users/infra/http/routers/profileRoutes';
import CustomerRouter from '../../../../modules/customers/routers/CustomerRoutes';
import ordersRouter from '../../../../modules/orders/routers/ordersRoutes';

const router = Router();

router.get('/health', (req, res) => {
  res.json({ message: "Hello dev, I'm alive!" });
});

router.use('/products', productsRouter);
router.use('/users', usersRouter);
router.use('/sessions', sessionRouter);
router.use('/avatars', avatarRouter);
router.use('/passwords', passwordRouter);
router.use('/profiles', profileRouter);
router.use('/customers', CustomerRouter);
router.use('/orders', ordersRouter);

export default router;
