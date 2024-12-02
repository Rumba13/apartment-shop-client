import { LoadingStore } from "../../../shared/model/loading-store";
import { action, makeObservable, observable, override } from "mobx";
import { Apartment } from "../../../shared/api/types/apartment";
import { apartmentService } from "../../../shared/api/apartment-service";
import { UUID } from "../../../shared/api/types/uuid";
import { favoritesStore } from "../../../features/APARTMENT/add-apartment-to-favorites/model/favorites-store";
import { currencyStore } from "../../../features/select-currency";
import { setPhotosAbsolutePath } from "../../../shared/lib/set-photos-absolute-path";
import { Currency } from "../../../shared/api/types/currency";

export class FavoriteListStore extends LoadingStore {
   constructor() {
      super();
      makeObservable(this, {
         isError: override,
         setIsLoading: override,
         setIsError: override,
         isLoading: override,
         favoriteApartments: observable,
         setFavoriteApartments: action,
      });
   }

   public favoriteApartments: Apartment[] | null = null;
   public setFavoriteApartments = (apartment: Apartment[] | null) => (this.favoriteApartments = apartment);

   public async loadFavoriteList(apartmentIds: UUID[], currency: Currency): Promise<void> {
      this.setIsLoading(true);
      this.setFavoriteApartments(null);

      try {
         const apartments: Apartment[] = [];
         const apartmentPromises: Promise<void | Apartment>[] = [];

         apartmentIds.forEach(id => {
            apartmentPromises.push(
               apartmentService.getApartmentById(id, currency).then(apartment => {
                  apartments.push(apartment);
               })
            );
         });

         await Promise.all(apartmentPromises);
         this.setFavoriteApartments(apartments);
      } catch (err) {
         this.setIsError(true);
         console.log(err);
      } finally {
         this.setIsLoading(false);
      }
   }

   public removeNotFavoriteApartments(favoriteApartmentIds: UUID[]) {
      if (!this.favoriteApartments) return;
      const newFavoriteApartments = this.favoriteApartments.filter(apartment => favoriteApartmentIds.includes(apartment.id));
      this.setFavoriteApartments(newFavoriteApartments);
   }
}

export const favoriteListStore = new FavoriteListStore();
