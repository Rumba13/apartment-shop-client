import {makeAutoObservable} from "mobx";

class FilterByDateStore {
    constructor() {
        makeAutoObservable(this);
    }

    public dates: string[] = ["", ""]
    public setDates = (dates: string[]) => this.dates = dates;
}

export const filterByDateStore = new FilterByDateStore()