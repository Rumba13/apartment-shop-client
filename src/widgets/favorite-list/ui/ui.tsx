import "./styles.scss";
import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { ApartmentCard, ApartmentCardSkeleton } from "../../../entities/apartment-card";
import { Apartment } from "../../../shared/api/types/apartment";
import { apartmentService } from "../../../shared/api/apartment-service";
import { currencyStore } from "../../../features/select-currency";
import { setPhotosAbsolutePath } from "../../../shared/lib/set-photos-absolute-path";
import { favoritesStore } from "../../../features/APARTMENT/add-apartment-to-favorites/model/favorites-store";

type PropsType = {};

export const FavoriteList = observer(({}: PropsType) => {
   const [apartments, setApartments] = React.useState<Apartment[] | null>(null);

   useEffect(() => {
      favoritesStore.favorites.forEach(id => {
         apartmentService
            .getApartmentById(id, currencyStore.currency)
            .then(apartment => {
               apartment && setPhotosAbsolutePath(apartment.photos);
               setApartments(apartments => [...(apartments || []), apartment]);
            })
            .catch(console.log);
      });
   }, [favoritesStore.favorites, currencyStore.currency]);

   if (apartments === null) {
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

   return (
      <div className="favorite-list">
         {apartments.map(apartment => (
            <ApartmentCard apartment={apartment} />
         ))}
      </div>
   );
});
