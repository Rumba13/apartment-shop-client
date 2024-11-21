import React, { useEffect, useLayoutEffect } from "react";
import {} from "./i18n";
import { Routes } from "../pages/routes";
import { useTypedTranslation } from "./i18n/use-typed-translation";
import { Overlay, overlayStore } from "./overlay";
import { userStore } from "../entities/user";
import "dayjs/locale/ru.js";
import dayjs from "dayjs";
import { observer } from "mobx-react";
import { SnackBar } from "../shared/ui/snack-bar/ui";
import { ConfirmModal } from "../shared/ui/confirm-modal/ui";
import { favoritesStore } from "../features/APARTMENT/add-apartment-to-favorites/model/favorites-store";
import { ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME } from "../shared/lib/constants";

export const App = observer(() => {
   const { i18n } = useTypedTranslation();

   useEffect(() => {
      i18n.changeLanguage("ru");
      dayjs.locale("ru");
      overlayStore.updateScrollWidth();
      favoritesStore.loadFavoriteListFromLocalStorage();

      userStore.auth(localStorage.getItem(ACCESS_TOKEN_NAME), localStorage.getItem(REFRESH_TOKEN_NAME), (accessToken, refreshToken) => {
         localStorage.setItem(ACCESS_TOKEN_NAME, accessToken);
         localStorage.setItem(REFRESH_TOKEN_NAME, refreshToken);
      });
   }, []);

   return (
      <div className="app">
         <ConfirmModal />
         <SnackBar />
         <Overlay />
         <Routes />
      </div>
   );
});
