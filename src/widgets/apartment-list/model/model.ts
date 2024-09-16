import {Apartment} from "../../../shared/api/types/apartment";
import {apartmentService} from "../../../shared/api/apartment-service";
import {makeAutoObservable} from "mobx";

class ApartmentListStore {
    constructor() {
        makeAutoObservable(this);
    }

    public apartments: Apartment[] | null = null;

    public async loadApartments(): Promise<void> {
        this.apartments = await apartmentService.loadAllApartments();
    }

}

export const apartmentListStore = new ApartmentListStore();