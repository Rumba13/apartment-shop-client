import {Apartment} from "../../../shared/api/types/apartment";
import {apartmentService} from "../../../shared/api/apartment-service";
import {makeAutoObservable} from "mobx";

class ApartmentListStore {
    constructor() {
        makeAutoObservable(this);
    }

    public apartments: Apartment[] | null = null;



    public setApartments = (apartments:Apartment[]) => {
        this.apartments = apartments;
    };
}

export const apartmentListStore = new ApartmentListStore();