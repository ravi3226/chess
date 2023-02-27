import dotenv from 'dotenv';
dotenv.config();

export interface ServerConfig {
    port: string | number
}

const getServerConfig = {
    development: {
        port: process.env.HTTP_DEV_PORT
    },
    production: {
        port: process.env.HTTP_PROD_PORT
    },
    test: {
        port: process.env.HTTP_DEV_PORT || 3003
    }
}

export const serverConfig : ServerConfig = getServerConfig[process.env.NODE_ENV || 'test'];