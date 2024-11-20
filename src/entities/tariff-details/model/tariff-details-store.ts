import { LoadingStore } from "../../../shared/model/loading-store";
import { action, makeObservable, observable, override } from "mobx";
import { Tariff } from "../../../shared/api/types/tariff";
import { tariffService } from "../../../shared/api/tariff-service";
import { UUID } from "../../../shared/api/types/uuid";

class TariffDetailsStore extends LoadingStore {
   constructor() {
      super();
      makeObservable(this, {
         isLoading: override,
         isError: override,
         setIsError: override,
         setIsLoading: override,
         tariffDetails: observable,
         setTariffDetails: action,
      });
   }

   public tariffDetails: Tariff | null = null;
   public setTariffDetails = (tariffDetails: Tariff) => (this.tariffDetails = tariffDetails);

   public async loadTariffDetails(tariffId: UUID) {
      this.setIsLoading(true);
      this.setIsError(false);

      try {
         const tariff = await tariffService.loadTariff(tariffId);
         this.setTariffDetails(tariff);
      } catch (err) {
         this.setIsError(true);
         console.error(err);
      }
      this.setIsLoading(false);
   }
}

export const tariffDetailsStore = new TariffDetailsStore();
