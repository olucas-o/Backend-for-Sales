import Router from 'express';

const router = Router();

router.get('/health', (req, res) => {
  res.json({ message: "Hello dev, I'm alive!" });
});

export default router;
