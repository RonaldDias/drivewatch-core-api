import rateLimit from "express-rate-limit";
import RedisStore from "rate-limit-redis";
import Redis from "ioredis";

export const redisClient = new Redis({
  host: process.env.REDIS_HOST || "localhost",
  port: Number(process.env.REDIS_PORT) || 6379,
});

export const globalRateLimiter = rateLimit({
  store: new RedisStore({
    sendCommand: async (...args: string[]) => {
      const reply = await redisClient.call(args[0], ...args.slice(1));
      return reply as any;
    },
  }),
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

export const authRateLimiter = rateLimit({
  store: new RedisStore({
    sendCommand: async (...args: string[]) => {
      const reply = await redisClient.call(args[0], ...args.slice(1));
      return reply as any;
    },
  }),
  windowMs: 60 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
});
