import './styles.scss';
import {SvgIcon} from "../../../../shared/ui/svg-icon";
import UserProfileIcon from "../../../../assets/images/user-profile.svg"
import BurgerIcon from "../../../../assets/images/burger-menu.svg"
import {UseTypedTranslation} from "../../../../app/i18n/use-typed-translation";


export function UserMenu() {
    const {t} = UseTypedTranslation();
    return (
        <div className="user-menu">
            <SvgIcon className="burger-icon" icon={BurgerIcon}/>
            <SvgIcon className="user-profile-icon" icon={UserProfileIcon}/>


            <ul className="user-menu-options">
                <li className="options-item">
                    <span className="options-item__title">{t("Sign In")}</span>
                </li>
            </ul>
        </div>
    )
}
