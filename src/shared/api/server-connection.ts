import axios from "axios";
import { CONSTANTS } from "../lib/constants";

export const serverConnection = axios.create({
   baseURL: CONSTANTS.SERVER_URL_DEV,
});
