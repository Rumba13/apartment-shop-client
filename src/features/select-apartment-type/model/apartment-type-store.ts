import {ApartmentType} from "../../../shared/api/types/apartment-type";
import {makeAutoObservable} from "mobx";

class ApartmentTypeStore {
    constructor() {
        makeAutoObservable(this);
    }

    public apartmentType:ApartmentType  = "House";
    public setApartmentType = (type: ApartmentType) => { this.apartmentType = type; console.log(12); };
}

export const apartmentTypeStore= new ApartmentTypeStore()