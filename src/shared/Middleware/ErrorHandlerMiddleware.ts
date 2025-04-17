import { Request, Response, NextFunction } from 'express';
import AppError from '../erros/AppError';

export default class ErrorHandlerMiddleware {
  public static handleError(
    error: Error,
    _req: Request,
    res: Response,
    _next: NextFunction,
  ) {
    console.error('🔥 Erro capturado pelo middleware:', error);

    if (error instanceof AppError) {
      res.status(error.statusCode).json({
        type: 'error',
        message: error.message,
      });
      return;
    }

    res.status(500).json({
      type: 'error',
      message: 'Internal server error',
    });
  }
}
