import {makeAutoObservable} from "mobx";
import {Currency} from "../../../shared/api/types/currency";

export class CurrencyStore {
    constructor() {
        makeAutoObservable(this);
    }

    public currency: Currency = "USD";

    public setCurrency(currency: Currency){
        this.currency = currency;
    }
}