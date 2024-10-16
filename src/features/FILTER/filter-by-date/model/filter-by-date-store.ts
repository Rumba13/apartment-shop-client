import {makeAutoObservable} from "mobx";

class FilterByDateStore {
    constructor() {
        makeAutoObservable(this);
    }

    public dates: (string | null)[] = [null, null]
    public setDates = (dates: (string | null)[]) => this.dates = dates;

    public removeFilter = () => {
        this.setDates([null, null])
    }
}

export const filterByDateStore = new FilterByDateStore()