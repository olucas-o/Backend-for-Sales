import Redis, { Redis as RebisClient } from 'ioredis';
import CacheConfig from '../../config/cache';

export class RedisCache {
  private client: Redis;

  constructor() {
    this.client = new Redis(CacheConfig.config.redis);
  }

  public async save(key: string, value: string): Promise<void> {
    await this.client.set(key, value);
  }
  public async recover<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key);

    if (!data) {
      return null;
    }

    const parsedData = JSON.parse(data) as T;
    return parsedData;
  }

  public async invalidade(key: string): Promise<void>{
    await this.client.del(key)
  }
}
