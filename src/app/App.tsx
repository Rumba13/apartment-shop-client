import React, {useEffect, useLayoutEffect} from 'react';
import {} from "./i18n";
import {Routes} from "../pages/routes";
import {useTypedTranslation} from "./i18n/use-typed-translation";
import {Overlay, overlayStore} from "./overlay";
import {userStore} from "../entities/user";
import "dayjs/locale/ru.js"
import dayjs from "dayjs";
import {observer} from "mobx-react";
import {SnackBar} from "../shared/ui/snack-bar/ui";
import useLocalStorageState from "use-local-storage-state";
import {ConfirmModal} from "../shared/ui/confirm-modal/ui";
import {OrderIsSubmittedModal} from "../features/APARTMENT/order-apartment/ui/order-is-submitted-modal";
import {favoritesStore} from "../features/APARTMENT/add-apartment-to-favorites/model/favorites-store";

export const App = observer(() => {
    const {i18n} = useTypedTranslation();
    const [accessToken, setAccessToken, {removeItem: removeAccessToken}] = useLocalStorageState<string>("ACCESS-TOKEN", {defaultValue: ""});
    const [refreshToken, setRefreshToken, {removeItem: removeRefreshToken}] = useLocalStorageState<string>("REFRESH-TOKEN", {defaultValue: ""});

    useEffect(() => {
        i18n.changeLanguage("ru");
        dayjs.locale("ru")
        overlayStore.updateScrollWidth();
        favoritesStore.loadFavoriteListFromLocalStorage()

        userStore.auth(accessToken, refreshToken, (accessToken, refreshToken) => {
            setAccessToken(accessToken)
            setRefreshToken(refreshToken)
        });
    }, []);

    return (
        <div className="app">
            <OrderIsSubmittedModal/>
            <ConfirmModal/>
            <SnackBar/>
            <Overlay/>
            <Routes/>
        </div>
    );
});