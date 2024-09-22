import {Currency} from "../../../shared/api/types/currency";

export const currencyToPostfixMap:{[key in Currency]: string} = {
    "USD": "$",
    "BYN" : "Br",
    "EUR":"€"
}