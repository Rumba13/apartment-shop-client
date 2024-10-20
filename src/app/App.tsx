import React, {useEffect, useLayoutEffect} from 'react';
import {} from "./i18n";
import {Routes} from "../pages/routes";
import {useTypedTranslation} from "./i18n/use-typed-translation";
import {Overlay} from "./overlay";
import {userStore} from "../entities/user";
import "dayjs/locale/ru.js"
import dayjs from "dayjs";
import {observer} from "mobx-react";
import {SnackBar} from "../shared/ui/snack-bar/ui";
import useLocalStorageState from "use-local-storage-state";
import {ConfirmModal} from "../shared/ui/confirm-modal/ui";

export const App = observer(() => {
    const {i18n} = useTypedTranslation();
    const [accessToken,s1, {removeItem:removeAccessToken}] = useLocalStorageState<string>("ACCESS-TOKEN", {defaultValue: ""});
    const [refreshToken,s2, {removeItem:removeRefreshToken}] = useLocalStorageState<string>("REFRESH-TOKEN", {defaultValue: ""});

    useEffect(() => {
        i18n.changeLanguage("ru");
        dayjs.locale("ru")
        userStore.auth(accessToken, () => {
            removeRefreshToken();
            removeAccessToken();

        }).then(() => {
            if(userStore.isError)
            {
                userStore.auth(accessToken, () => {
                    removeRefreshToken();
                    removeAccessToken();
                })
            }
        })
    }, []);


    return (
        <div className="app">
            <ConfirmModal/>
            <SnackBar/>
            <Overlay/>
            <Routes/>
        </div>
    );
});