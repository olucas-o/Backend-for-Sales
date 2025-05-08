import { RedisOptions } from 'ioredis';

interface CacheConfig {
config: RedisOptions;
driver: string;
}

export default {
config: {
host: process.env.REDIS_HOST || 'localhost',
port: process.env.REDIS_PORT || 6379,
password: process.env.REDIS_PASS || undefined,
},
driver: 'redis',
} as CacheConfig;
