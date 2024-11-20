import { LoadingStore } from "../../../../shared/model/loading-store";
import { action, makeObservable, observable, override } from "mobx";
import { Apartment } from "../../../../shared/api/types/apartment";
import { UUID } from "../../../../shared/api/types/uuid";
import { Currency } from "../../../../shared/api/types/currency";
import { apartmentService } from "../../../../shared/api/apartment-service";

class CreateOrderFormStore extends LoadingStore {
   constructor() {
      super();
      makeObservable(this, {
         isLoading: override,
         setIsError: override,
         setIsLoading: override,
         isError: override,
         setCurrentApartment: action,
         currentApartment: observable,
      });
   }

   public currentApartment: Apartment | null = null;
   public setCurrentApartment = (value: Apartment | null) => (this.currentApartment = value);

   public async loadCurrentApartment(apartmentId: UUID, currency: Currency) {
      this.setIsLoading(true);

      try {
         this.setCurrentApartment(await apartmentService.getApartmentById(apartmentId, currency));
      } catch (error) {
         console.log(error);
         this.setIsError(true);
      } finally {
         this.setIsLoading(false);
      }
   }
}

export const createOrderFormStore = new CreateOrderFormStore();
