import {LoadingStore} from "../../../../shared/model/loading-store";
import {action, makeObservable, observable, override} from "mobx";
import {apartmentService} from "../../../../shared/api/apartment-service";
import {UUID} from "../../../../shared/api/types/uuid";
import {Currency} from "../../../../shared/api/types/currency";
import {Apartment} from "../../../../shared/api/types/apartment";

export class OrderApartmentStore extends LoadingStore {
    constructor() {
        super();
        makeObservable(this, {
            isLoading: override,
            setIsLoading: override,
            setIsError: override,
            isError: override,
            currentApartment:observable,
            setCurrentApartment:action
        })
    }

    public currentApartment: Apartment | null = null;
    public setCurrentApartment = (currentApartment: Apartment | null) => this.currentApartment = currentApartment

    public async loadCurrentApartment(apartmentId: UUID, resultCurrency: Currency) {
        this.setIsLoading(true);
        this.setIsError(false);

        try {
            const apartment = await apartmentService.getApartmentById(apartmentId, resultCurrency);
            if (!apartment) throw new Error("Error getting apartment with id " + apartmentId);
            this.setCurrentApartment(apartment);
        } catch (err) {
            this.setIsError(true);
        } finally {
            this.setIsLoading(true)
        }
    }
}
export const orderApartmentStore= new OrderApartmentStore()