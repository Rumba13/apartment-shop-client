import axios from "axios";

export const serverConnection = axios.create({
    baseURL: 'http://91.210.107.132:8080/api/v1',
    withCredentials: true
});