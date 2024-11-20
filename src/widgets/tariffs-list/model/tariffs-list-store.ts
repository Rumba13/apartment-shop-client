import { makeObservable, override } from "mobx";
import { LoadingStore } from "../../../shared/model/loading-store";
import { Tariff } from "../../../shared/api/types/tariff";
import { tariffService } from "../../../shared/api/tariff-service";
import { TariffShort } from "../../../shared/api/types/tariff-short";

class TariffsListStore extends LoadingStore {
   constructor() {
      super();
      makeObservable(this, {
         setIsLoading: override,
         isLoading: override,
         isError: override,
         setIsError: override,
      });
   }

   public tariffs: TariffShort[] | null = null;
   public setTariffs = (tariffs: TariffShort[]) => (this.tariffs = tariffs);

   public async loadTariffs() {
      this.setIsLoading(true);
      this.setIsError(false);

      try {
         const tariffs = await tariffService.loadTariffs();
         this.setTariffs(tariffs.content);
      } catch (err) {
         this.setIsError(true);
         console.error(err);
      }
      this.setIsLoading(false);
   }
}

export const tariffsListStore = new TariffsListStore();
