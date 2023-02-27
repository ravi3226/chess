import dotenv from 'dotenv'

dotenv.config();
export interface Redis {
    port: string,
    host: string,
    protocol: string
}

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
}

export const redisConfig: Redis = getRedisConfig[process.env.NODE_ENV || 'test'];

export interface setRedis {
    success: boolean,
    message?: string,
    stored?: any
}

export interface getRedis {
    success: boolean,
    message?: string,
    value?: any
}

export interface deleteRedis {
    success: boolean,
    message?: string
}