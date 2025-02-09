export const CONSTANTS = {
   SERVER_URL_PROD: "http://api:8081/api/v1",
   SERVER_URL_DEV: "http://localhost:8080/api/v1/", //old dev server: https://24kv.by/api/v1/
   IMAGE_SERVER_URL_PROD: "https://24kv.by/",
   IMAGE_SERVER_URL_DEV: "http://localhost:8080",

   get IMAGE_SERVER_URL() {
      if (process.env.NODE_ENV === "production") {
         return this.IMAGE_SERVER_URL_PROD;
      } else {
         return this.IMAGE_SERVER_URL_DEV;
      }
   },

   get SERVER_URL() {
      if (process.env.NODE_ENV === "production") {
         return this.SERVER_URL_PROD;
      } else {
         return this.SERVER_URL_DEV;
      }
   },
};

export const ACCESS_TOKEN_NAME = "ACCESS_TOKEN";
export const REFRESH_TOKEN_NAME = "REFRESH_TOKEN";
