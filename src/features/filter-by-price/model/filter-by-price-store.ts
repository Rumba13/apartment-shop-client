import {makeAutoObservable} from "mobx";

class FilterByPriceStore {
    constructor() {
        makeAutoObservable(this);
    }
    public readonly maxPriceBound:number = 860;
    public readonly minPriceBound:number = 110;

    public minPrice:number = this.minPriceBound;//TODO Get minPrice, maxPrice from backend
    public maxPrice:number = this.maxPriceBound;


    public setMaxPrice = (maxPrice: number) => this.maxPrice = maxPrice
    public setMinPrice = (minPrice: number) => this.minPrice = minPrice
}

export const filterByPriceStore  = new FilterByPriceStore()
