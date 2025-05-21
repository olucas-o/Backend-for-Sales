import express from 'express';
import cors from 'cors';
import 'reflect-metadata';
import 'express-async-errors';
import { errors } from 'celebrate';
import '../../conteiners/container'

import ErrorHandlerMiddleware from '../../middleware/ErrorHandlerMiddleware';
import { AppDataSource } from '../typeorm/data-source';
import router from './routes';
import rateLimiter from '../../middleware/rateLimiter';

AppDataSource.initialize()
  .then(async () => {
    console.log('Conectado ao banco de dados');
    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use(rateLimiter);
    app.use(router);
    app.use(errors());
    app.use(ErrorHandlerMiddleware.handleError);

    const PORT = 3333;
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Erro ao conectar ao banco de dados:', error);
  });
