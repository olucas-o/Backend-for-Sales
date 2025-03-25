import express from 'express';
import cors from 'cors';
import router from './routes';
import 'express-async-errors';
import ErrorHandlerMiddleware from '../Middleware/ErrorHandlerMiddleware';
import { AppDataSource } from '../typeorm/data-source';



AppDataSource.initialize()
.then(async () => {

  console.log('Conectado ao banco de dados');
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use(router);
  app.use(ErrorHandlerMiddleware.handleError);

  const PORT = 3333;
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
})
.catch( error => {
console.error('Erro ao conectar ao banco de dados:', error);
});

