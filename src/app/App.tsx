import React, {useEffect} from 'react';
import {} from "./i18n";
import {Routes} from "../pages/routes";
import {useTypedTranslation} from "./i18n/use-typed-translation";
import {Overlay} from "./overlay";
import {userStore} from "../entities/user";
import {useCookies} from "react-cookie";
import "dayjs/locale/ru.js"
import dayjs from "dayjs";
import {observer} from "mobx-react";
import {AppLoader} from "../entities/app-loader";

export const App = observer(() => {
    const {t, i18n} = useTypedTranslation();
    const [cookies] = useCookies(["ACCESS-TOKEN"]);


    useEffect(() => {
        i18n.changeLanguage("ru");
        dayjs.locale("ru")
        userStore.auth(cookies["ACCESS-TOKEN"])
    }, []);


    return (
        <div className="app">
            <Overlay/>
            <Routes/>
        </div>
    );
});