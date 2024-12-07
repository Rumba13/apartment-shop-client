import "./styles.scss";
import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { ApartmentCard, ApartmentCardSkeleton } from "../../../entities/apartment-card";
import { FavoritesStore } from "../../../features/APARTMENT/add-apartment-to-favorites/model/favorites-store";
import { FavoriteListStore } from "../model/favorite-list-store";
import { useTranslation } from "react-i18next";
import { match, P } from "ts-pattern";
import { currencyStore } from "../../../features/select-currency";

type PropsType = {
   favoriteListStore: FavoriteListStore;
   favoritesStore: FavoritesStore;
};

export const FavoriteList = observer(({ favoriteListStore, favoritesStore }: PropsType) => {
   const { t } = useTranslation();

   useEffect(() => {
      favoriteListStore.loadFavoriteList(favoritesStore.favorites, currencyStore.currency);
   }, [currencyStore.currency]);

   useEffect(() => {
      favoriteListStore.removeNotFavoriteApartments(favoritesStore.favorites);
   }, [favoritesStore.favorites]);

   const renderContent = match(favoriteListStore)
      .with({ isError: true }, () => <>{t("Some error has occurred")}</>)
      .with({ isLoading: true }, () => (
         <>
            {Array.from({ length: favoritesStore.favoritesCount }, (_, i) => (
               <ApartmentCardSkeleton key={i} />
            ))}
         </>
      ))
      .with({ favoriteApartments: P.union(P.not(P.nullish), []) }, ({ favoriteApartments }) => (
         <>
            {favoriteApartments.map(apartment => <ApartmentCard apartment={apartment} />)}
         </>
      ))
      .with({ favoriteApartments: null }, () => <></>)
      .with({ favoriteApartments: [] }, () => <>{t("Nothing Found")}</>)
      .exhaustive();

   return <div className="favorite-list">{renderContent}</div>;
});
