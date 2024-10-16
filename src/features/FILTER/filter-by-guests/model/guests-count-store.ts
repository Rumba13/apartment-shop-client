import {makeAutoObservable} from "mobx";

class GuestsCountStore {
    constructor() {
        makeAutoObservable(this)
    }

    public readonly minGuestsCountBound = 0;

    public maxGuestsCount: number = 0;
    public setMaxGuestsCount = (value: number) => this.maxGuestsCount = value

    public removeFilter = () => {
        this.setMaxGuestsCount(0)
    }

}

export const guestsCountStore = new GuestsCountStore()