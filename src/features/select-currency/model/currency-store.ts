import {makeAutoObservable} from "mobx";
import {Currency} from "../../../shared/api/types/currency";

class CurrencyStore {
    constructor() {
        makeAutoObservable(this);
    }

    public currency: Currency = "BYN";

    public setCurrency(currency: Currency){
        this.currency = currency;
    }
}
export const currencyStore = new CurrencyStore();