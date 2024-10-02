import React, {useEffect} from 'react';
import {} from "./i18n";
import {Routes} from "../pages/routes";
import {useTypedTranslation} from "./i18n/use-typed-translation";
import {Overlay} from "./overlay";

export function App() {
    const {t, i18n} = useTypedTranslation();

    useEffect(() => {
        i18n.changeLanguage("ru");
    }, []);

    return (
        <div className="app">
            <Overlay/>
            <Routes/>
        </div>
    );
}