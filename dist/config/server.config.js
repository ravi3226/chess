import dotenv from 'dotenv';
dotenv.config();
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
};
export const serverConfig = getServerConfig[process.env.NODE_ENV || 'test'];
//# sourceMappingURL=server.config.js.map