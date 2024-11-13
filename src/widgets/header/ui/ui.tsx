import './styles.scss';
import {Logo} from "../../../entities/logo";
import {SelectCurrencyDropdown} from "../../../features/select-currency";
import {useTypedTranslation} from "../../../app/i18n/use-typed-translation";
import {AuthModal} from "../../auth-modal";
import {observer} from "mobx-react";
import React, {useEffect} from "react";
import {userStore} from "../../../entities/user";
import {UserMenu} from "./user-menu/ui";
import {Breadcrumbs} from "../../../shared/ui/bread-crumbs";
import {HeaderBreadcrumbs} from "./header-breadcrumbs";
import {FavoritesCount} from "../../../features/APARTMENT/add-apartment-to-favorites";

type PropsType = {
    noSearch?: boolean;
}

export const Header = observer(({noSearch = false}: PropsType) => {
    const {t} = useTypedTranslation();

    useEffect(() => {

    }, [userStore.user]);


    return <header className="header">
        <div className="header-top">
            <Logo/>
            <FavoritesCount/>
            <SelectCurrencyDropdown/>
            <UserMenu/>
            <AuthModal/>
        </div>

        {!noSearch &&
            <div className="header-bottom">
                <div className="header-bottom-container">
                    <h1 className="header-bottom__title">{t("Daily rent from owners all over Belarus")}</h1>
                    <h2 className="header-bottom__sub-title">{t("You can rent apartment")}</h2>
                </div>

            </div>
        }
        <HeaderBreadcrumbs/>

    </header>
});
