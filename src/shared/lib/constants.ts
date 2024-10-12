export const CONSTANTS = {
    SERVER_URL_DEV: "http://91.210.107.132:3000/",
    SERVER_URL_PROD: "http://localhost:3000/",
    IS_PRODUCTION: true,
    get SERVER_URL() {
        return this.IS_PRODUCTION ? this.SERVER_URL_PROD : this.SERVER_URL_DEV;
    }
}

