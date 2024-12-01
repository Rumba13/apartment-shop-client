import "./styles.scss";
import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { ApartmentCard, ApartmentCardSkeleton } from "../../../entities/apartment-card";
import { currencyStore } from "../../../features/select-currency";
import { favoritesStore } from "../../../features/APARTMENT/add-apartment-to-favorites/model/favorites-store";
import { favoriteListStore } from "../model/favorite-list-store";

type PropsType = {};

export const FavoriteList = observer(({}: PropsType) => {
   useEffect(() => {
      favoriteListStore.loadFavoriteList(favoritesStore.favorites);
   }, [favoritesStore.favorites, currencyStore.currency]);

   console.log(favoritesStore.favoritesCount)

   if (favoriteListStore.isLoading) {

      return (
         <div className="favorite-list">
            {Array.from({ length: favoritesStore.favoritesCount }, (_, i) => (
               <ApartmentCardSkeleton key={i} />
            ))}
         </div>
      );
   }
   if (!favoriteListStore.favoriteApartments) {
      return <div className="favorite-list"></div>;
   }

   return (
      <div className="favorite-list">
         {favoriteListStore.favoriteApartments.map(apartment => (
            <ApartmentCard apartment={apartment} />
         ))}
      </div>
   );
});
