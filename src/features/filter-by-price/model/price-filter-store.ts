import {makeAutoObservable} from "mobx";

class FilterByPriceStore {
    constructor() {
        makeAutoObservable(this);
    }

    public maxPriceBound: number = 860;
    public minPriceBound: number = 110;

    public setPriceBounds = (minPriceBound: number, maxPriceBound: number) => {
        this.minPriceBound = minPriceBound;
        this.maxPriceBound = maxPriceBound;
        this.removeFilter()
    }

    public readonly cooldown: number = 250;
    private t: any = null

    public minPrice: number = this.minPriceBound;//TODO Get minPrice, maxPrice from backend
    public maxPrice: number = this.maxPriceBound;
    public isOnCooldown: boolean = false;
    public setIsOnCooldown = (isOnCooldown: boolean) => this.isOnCooldown = isOnCooldown;

    public setOnCooldown = () => {
        clearTimeout(this.t)
        this.setIsOnCooldown(true);
        this.t = setTimeout(() => this.setIsOnCooldown(false), this.cooldown)
    }

    public setMaxPrice = (maxPrice: number) => this.maxPrice = maxPrice
    public setMinPrice = (minPrice: number) => this.minPrice = minPrice

    public removeFilter() {
        this.setMaxPrice(this.maxPriceBound);
        this.setMinPrice(this.minPriceBound);
    }
}

export const priceFilterStore = new FilterByPriceStore()
