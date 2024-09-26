import {makeAutoObservable} from "mobx";

class FilterByPriceStore {
    constructor() {
        makeAutoObservable(this);
    }
    public readonly maxPriceBound:number = 860;
    public readonly minPriceBound:number = 110;
    public readonly coolDown:number = 500;
    private t:any = null

    public minPrice:number = this.minPriceBound;//TODO Get minPrice, maxPrice from backend
    public maxPrice:number = this.maxPriceBound;
    public readyToSearch:boolean = true;

    public setOnCooldown = () => {
        clearTimeout(this.t && this.t)
        this.readyToSearch = false;
        this.t = setTimeout(() => this.readyToSearch = true, this.coolDown)
    }

    public setMaxPrice = (maxPrice: number) => this.maxPrice = maxPrice
    public setMinPrice = (minPrice: number) => this.minPrice = minPrice

    public removeFilter() {
        this.setMaxPrice(this.maxPriceBound);
        this.setMinPrice(this.minPriceBound);
    }
}

export const priceFilterStore  = new FilterByPriceStore()
