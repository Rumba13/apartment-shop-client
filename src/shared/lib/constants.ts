export enum SERVER_TYPE {
    PRODUCTION,
    DEVELOPMENT,
}

export const CONSTANTS = {
    SERVER_URL_PROD: "http://api:8081/api/v1",
    SERVER_URL_DEV: "https://24kv.by/api/v1/",
        IMAGE_SERVER_URL: "https://24kv.by/",
    SERVER_TYPE: SERVER_TYPE.DEVELOPMENT,

    get SERVER_URL() {
        switch (this.SERVER_TYPE)
        {
            case SERVER_TYPE.PRODUCTION: return this.SERVER_URL_PROD;
            case SERVER_TYPE.DEVELOPMENT: return this.SERVER_URL_DEV;
        }
    }
}
