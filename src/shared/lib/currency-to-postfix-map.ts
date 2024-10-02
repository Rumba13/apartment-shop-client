import {Currency} from "../api/types/currency";

export const currencyToPostfixMap:{[key in Currency]: string} = {
    "USD": "$",
    "BYN" : "р",
    "EUR":"€"
}