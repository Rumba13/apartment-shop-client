import "./styles.scss";
import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { ApartmentCard, ApartmentCardSkeleton } from "../../../entities/apartment-card";
import { Apartment } from "../../../shared/api/types/apartment";
import { apartmentService } from "../../../shared/api/apartment-service";
import { currencyStore } from "../../../features/select-currency";
import { setPhotosAbsolutePath } from "../../../shared/lib/set-photos-absolute-path";
import { favoritesStore } from "../../../features/APARTMENT/add-apartment-to-favorites/model/favorites-store";
import { favoriteListStore } from "../model/favorite-list-store";

type PropsType = {};

export const FavoriteList = observer(({}: PropsType) => {

   useEffect(() => {
      favoriteListStore.loadFavoriteList(favoritesStore.favorites)
   }, [favoritesStore.favorites, currencyStore.currency]);

   if (favoriteListStore.isLoading) {
      return (
         <div className="favorite-list">
            <ApartmentCardSkeleton />
            <ApartmentCardSkeleton />
            <ApartmentCardSkeleton />
            <ApartmentCardSkeleton />
            <ApartmentCardSkeleton />
         </div>
      );
   }
   if (!favoriteListStore.favoriteApartments) {
      return (
         <div className="favorite-list"></div>
      );
   }

   return (
      <div className="favorite-list">
         {favoriteListStore.favoriteApartments.map(apartment => (
            <ApartmentCard apartment={apartment} />
         ))}
      </div>
   );
});
