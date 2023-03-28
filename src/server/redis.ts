import { env } from "process";
import { createClient } from "redis";

type RedisClient = ReturnType<typeof createClient>;
const globalForRedis = globalThis as unknown as { redis: RedisClient };

const createRedisClient = () => {
  const redis = createClient();
  redis.connect();
  return redis;
}

export const redis =
  globalForRedis.redis ||
  createRedisClient();

if (env.NODE_ENV !== "production") globalForRedis.redis = redis;

