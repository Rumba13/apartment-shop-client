import { action, makeAutoObservable, makeObservable, observable, override } from "mobx";
import { GuestsCountByCategory } from "../../../../shared/api/types/guests-count-by-category";
import { orderService } from "../../../../shared/api/order-service";
import { Price } from "../../../../shared/api/types/price";
import { UUID } from "../../../../shared/api/types/uuid";
import { Currency } from "../../../../shared/api/types/currency";
import { LoadingStore } from "../../../../shared/model/loading-store";

class GetOrderPriceStore extends LoadingStore {
   constructor() {
      super();
      makeObservable(this, {
         orderPrice: observable,
         bookDateRange: observable,
         setBookDateRange: action,
         setGuestCountByCategory: action,
         setOrderPrice: action,
         guestCountByCategory: observable,
         isError: override,
         isLoading: override,
         setIsLoading: override,
         setIsError: override,
      });
   }

   public orderPrice: Price = { amount: 0, currency: "USD" };
   public setOrderPrice = (value: Price) => (this.orderPrice = value);

   public bookDateRange: string[] | null = null;
   public setBookDateRange = (value: string[]) => (this.bookDateRange = value);

   public guestCountByCategory: GuestsCountByCategory | null = null;
   public setGuestCountByCategory = (value: GuestsCountByCategory) => (this.guestCountByCategory = value);

   public async loadOrderPrice(apartmentId: UUID, resultCurrency: Currency) {
      this.setIsLoading(false);
      if (this.bookDateRange === null || this.guestCountByCategory === null) {
         this.setIsError(true);
         throw new Error("bookDateRange or guestCountByCategory hasn't been initialized.");
      }
      this.setIsLoading(true);

      try {
         const orderPrice = await orderService.calculateOrderPrice({
            apartmentId,
            resultCurrency,
            fromDate: this.bookDateRange[0], //TODO rename to check-in, check-out dates
            toDate: this.bookDateRange[1],
            adultQuantity: this.guestCountByCategory.adultCount,
            teenQuantity: this.guestCountByCategory.teenCount,
            babyQuantity: this.guestCountByCategory.babyCount,
            petQuantity: this.guestCountByCategory.petCount,
            kidQuantity: this.guestCountByCategory.kidCount,
         });
         this.setOrderPrice(orderPrice);
      } catch (error) {
         console.log(error);
         this.setIsError(true);
      } finally {
         this.setIsLoading(false);
      }
   }
}

export const orderPriceStore = new GetOrderPriceStore();
