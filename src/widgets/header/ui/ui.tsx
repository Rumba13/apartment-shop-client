import './styles.scss';
import {Logo} from "../../../entities/logo";
import {SelectCityDropdown} from "../../../features/select-city";
import {SelectCurrencyDropdown} from "../../../features/select-currency";
import {OpenWishListButton} from "../../../features/add-to-wishlist";
import {UserMenu} from "./user-menu/ui";
import {useTypedTranslation} from "../../../app/i18n/use-typed-translation";
import {Search} from "../../search";
import {AuthModal} from "../../auth-modal";

type PropsType = {
    noSearch?: boolean;
}

export function Header({noSearch = false}: PropsType) {
    const {t} = useTypedTranslation();

    return <header className="header">
        <AuthModal/>

        <div className="header-top">
            <Logo/>
            <SelectCityDropdown/>
            <SelectCurrencyDropdown/>
            <OpenWishListButton/>
            <UserMenu/>
        </div>

        {!noSearch &&
            <div className="header-bottom">
                <div className="header-bottom-container">
                    <h1 className="header-bottom__title">{t("Daily rent from owners all over Belarus")}</h1>
                    <h2 className="header-bottom__sub-title">{t("You can rent apartment")}</h2>
                    <Search/>
                </div>
            </div>
        }


    </header>
}
