import dotenv from 'dotenv';
dotenv.config();
const getRedisConfig = {
    development: {
        port: process.env.REDIS_DEV_PORT,
        host: process.env.REDIS_DEV_HOST,
        protocol: process.env.REDIS_DEV_PROTOCOL
    },
    production: {
        port: process.env.REDIS_PROD_PORT,
        host: process.env.REDIS_PROD_HOST,
        protocol: process.env.REDIS_PROD_PROTOCOL
    },
    test: {
        port: process.env.REDIS_TEST_PORT || '6379',
        host: process.env.REDIS_TEST_HOST || '127.0.0.1',
        protocol: process.env.REDIS_TEST_PROTOCOL || 'redis'
    }
};
export const redisConfig = getRedisConfig[process.env.NODE_ENV || 'test'];
//# sourceMappingURL=redis.config.js.map