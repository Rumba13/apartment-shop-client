import {makeAutoObservable} from "mobx";

class FilterByDateStore {
    constructor() {
        makeAutoObservable(this);
    }

    public dates: (string | null)[] = [null, null]
    public setDates = (dates: (string | null)[]) => {
        this._setDates(dates);
        this.setIsTouched(true);
    };
    private _setDates = (dates: (string | null)[]) => this.dates = dates;

    public isTouched: boolean = false
    public setIsTouched = (isTouched: boolean) => this.isTouched = isTouched;

    public removeFilter = () => {
        this.setDates([null, null])
    }
}

export const filterByDateStore = new FilterByDateStore()