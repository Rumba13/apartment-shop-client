import {makeAutoObservable} from "mobx";

class GuestStore {
    constructor() {
        makeAutoObservable(this);
    }

    public guestsCount: number = 1;
    public setGuestsCount = (count: number) => this.guestsCount = count
}

export const guestStore = new GuestStore();