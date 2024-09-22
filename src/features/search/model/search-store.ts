import {makeAutoObservable} from "mobx";
import {City} from "../../../shared/api/types/city";
import {ApartmentType} from "../../../shared/api/types/apartment-type";

class SearchStore {
    constructor() {
        makeAutoObservable(this);
    }

    public apartmentType:ApartmentType  = "House";
    public setApartmentType = (type: ApartmentType) => { this.apartmentType = type; };

    public guestsCount:number  = 1;
    public setGuestsCount = (count: number) => { this.guestsCount = count; };
}

export const searchStore = new SearchStore()