import {Apartment} from "../../../shared/api/types/apartment";
import {apartmentService} from "../../../shared/api/apartment-service";
import {makeAutoObservable} from "mobx";

class ApartmentListStore {
    constructor() {
        makeAutoObservable(this);
    }

    public apartments: Apartment[] | null = null;

    public currentPage:number = 1;
    public setCurrentPage = (property:number)  => this.currentPage = property
    public pageSize:number = 10;
    public setPageSize = (pageSize:number)  => this.pageSize = pageSize
    public totalPages:number = 1;
    public setTotalPages = (totalPages:number)  => this.totalPages = totalPages

    public setApartments = (apartments:Apartment[]) => {
        this.apartments = apartments;
    };
}

export const apartmentListStore = new ApartmentListStore();