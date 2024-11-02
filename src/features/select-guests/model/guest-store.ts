import {makeAutoObservable} from "mobx";
import {GuestsCountByCategory} from "../../../shared/api/types/guests-count-by-category";

class GuestStore {
    constructor() {
        makeAutoObservable(this);
    }

    public adultCount: number = 1;
    public setAdultCount = (value: number) => this.adultCount = value;
    public teenCount: number = 0;
    public setTeenCount = (value: number) => this.teenCount = value;
    public babyCount: number = 0;
    public setBabyCount = (value: number) => this.babyCount = value;
    public kidCount: number = 0;
    public setKidCount = (value: number) => this.kidCount = value;
    public petCount: number = 0;
    public setPetCount = (value: number) => this.petCount = value

    public get totalGuests(): number {
        return this.kidCount +this.babyCount + this.petCount + this.adultCount + this.teenCount;
    }
    public get guestCountByCategory():GuestsCountByCategory {
        return {
            adultCount: this.adultCount,
            babyCount: this.babyCount,
            kidCount: this.kidCount,
            petCount: this.petCount,
            teenCount: this.teenCount
        }
    }
}

export const guestStore = new GuestStore()