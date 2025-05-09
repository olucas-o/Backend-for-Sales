import { RateLimiterRedis } from 'rate-limiter-flexible';
import { createClient } from 'redis';
import { Request, Response, NextFunction } from 'express';
import AppError from '../erros/AppError';

const redisClient = createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
  password: process.env.REDIS_PASSWORD || undefined,
});

redisClient.connect().catch(console.error);

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'rateLimit',
  points: 5,
  duration: 5,
});

export default async function rateLimiter(
  req: Request,
  REDIS_PORTres: Response,
  next: NextFunction,
): Promise<void> {
  try {
    await limiter.consume(req.ip as string);
    return next();
  } catch (err) {
    throw new AppError('Too Many Requests', 429);
  }
}
