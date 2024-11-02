export enum SERVER_TYPE {
    PRODUCTION,
    DEVELOPMENT,
}

export const CONSTANTS = {
    SERVER_URL_PROD: "http://api:8081/api/v1",
    SERVER_URL_DEV: "http://5.35.85.50:8080/api/v1/",
    IMAGE_SERVER_URL: "http://5.35.85.50:3000/",
    SERVER_TYPE: SERVER_TYPE.DEVELOPMENT,

    get SERVER_URL() {
        switch (this.SERVER_TYPE)
        {
            case SERVER_TYPE.PRODUCTION: return this.SERVER_URL_PROD;
            case SERVER_TYPE.DEVELOPMENT: return this.SERVER_URL_DEV;
        }
    }
}

