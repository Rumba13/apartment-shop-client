import {Price} from "../api/types/price";
import {currencyToPostfixMap} from "./currency-to-postfix-map";

export function formatPrice(price: Price): string {
    return price.amount + " " + currencyToPostfixMap[price.currency];
}