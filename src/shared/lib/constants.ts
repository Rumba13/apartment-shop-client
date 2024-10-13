
enum SERVER_TYPE {
    PRODUCTION,
    DEVELOPMENT,
}


export const CONSTANTS = {
    SERVER_URL_PROD: "http://localhost:3000/",
    SERVER_URL_DEV: "http://91.210.107.132:8080/api/v1/",
    IMAGE_SERVER_URL: "http://91.210.107.132:3000/",
    SERVER_TYPE: SERVER_TYPE.DEVELOPMENT,

    get SERVER_URL() {
        switch (this.SERVER_TYPE)
        {
            case SERVER_TYPE.PRODUCTION: return this.SERVER_URL_PROD;
            case SERVER_TYPE.DEVELOPMENT: return this.SERVER_URL_DEV;
        }
    }
}

