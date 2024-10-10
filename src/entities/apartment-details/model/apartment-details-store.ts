import {Apartment} from "../../../shared/api/types/apartment";
import {UUID} from "../../../shared/api/types/uuid";
import {apartmentService} from "../../../shared/api/apartment-service.mocked";
import {makeAutoObservable} from "mobx";

class ApartmentDetailsStore {
    constructor() {
        makeAutoObservable(this)
    }

    public isLoading: boolean = false;
    public isError: boolean = false;
    public apartment: Apartment | null = null;

    public setIsError = (isError: boolean) => this.isError = isError;
    public setIsLoading = (isLoading: boolean) => this.isLoading = isLoading;
    public setApartment = (apartment: Apartment | null) => this.apartment = apartment;

    public async loadApartmentDetails(apartmentId: UUID) {
        this.setIsLoading(true);

        try {
            const apartment = await apartmentService.getApartmentById(apartmentId, "USD");

            if (!apartment) {
                this.setIsError(true);
                return;
            }

            this.setApartment(apartment)
        } catch (err) {
            console.log(err)
            this.setIsError(true);
        }
        finally {
            this.setIsLoading(false);
        }
    }
}

export const apartmentDetailsStore = new ApartmentDetailsStore()