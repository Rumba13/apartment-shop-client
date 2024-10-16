import './styles.scss';
import {Logo} from "../../../entities/logo";
import {SelectCurrencyDropdown} from "../../../features/select-currency";
import {useTypedTranslation} from "../../../app/i18n/use-typed-translation";
import {AuthModal} from "../../auth-modal";
import {FavoritesCount} from "../../../features/APARTMENT/add-apartment-to-favorites";
import {CONSTANTS} from "../../../shared/lib/constants";
import {authModalStore} from "../../auth-modal/model/auth-modal-store";

type PropsType = {
    noSearch?: boolean;
}

export function Header({noSearch = false}: PropsType) {
    const {t} = useTypedTranslation();

    return <header className="header">
        <AuthModal/>

        <div className="header-top">
            <Logo/>
            <SelectCurrencyDropdown/>
            {!(CONSTANTS.SERVER_URL === CONSTANTS.SERVER_URL_PROD) && (
                <FavoritesCount/>
            )}

            {/*<UserMenu/>*/}

            <div className="open-sign-in-modal"
                 onClick={() => authModalStore.setIsOpened(true)}
            >
                <span className="options-item__title">{t("Sign In")}</span>
            </div>
            <div className="open-sign-up-modal"
                 onClick={() => authModalStore.setIsOpened(true)}
            >
                <span className="options-item__title">{t("Sign Up")}</span>
            </div>
        </div>

        {!noSearch &&
            <div className="header-bottom">
                <div className="header-bottom-container">
                    <h1 className="header-bottom__title">{t("Daily rent from owners all over Belarus")}</h1>
                    <h2 className="header-bottom__sub-title">{t("You can rent apartment")}</h2>
                </div>
            </div>
        }


    </header>
}
