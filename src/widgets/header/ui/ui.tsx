import './styles.scss';
import {Logo} from "../../../entities/logo";
import {SelectCurrencyDropdown} from "../../../features/select-currency";
import {useTypedTranslation} from "../../../app/i18n/use-typed-translation";
import {AuthModal} from "../../auth-modal";
import {AuthModalActions} from "./auth-modal-actions/ui";
import {observer} from "mobx-react";
import {useEffect} from "react";
import {userStore} from "../../../entities/user";

type PropsType = {
    noSearch?: boolean;
}

export const Header = observer(({noSearch = false}: PropsType) => {
    const {t} = useTypedTranslation();

    useEffect(() => {

    }, [userStore.user]);

    return <header className="header">
        <AuthModal/>
        <div className="header-top">
            <Logo/>
            <SelectCurrencyDropdown/>
            {/*{!(CONSTANTS.SERVER_URL === CONSTANTS.SERVER_URL_PROD) && <FavoritesCount/>}*/}
            <AuthModalActions/>
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
});
