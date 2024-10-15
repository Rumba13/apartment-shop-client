import './styles.scss';
import {SvgIcon} from "../../../../shared/ui/svg-icon";
import UserProfileIcon from "../../../../assets/images/user-profile.svg"
import BurgerIcon from "../../../../assets/images/burger-menu.svg"
import {useTypedTranslation} from "../../../../app/i18n/use-typed-translation";
import {authModalStore} from "../../../auth-modal/model/auth-modal-store";
import {userStore} from "../../../../entities/user";
import {observer} from "mobx-react";
import {useEffect} from "react";
import {signOutService} from "../../../../shared/api/sign-out-service";
import {useCookies} from "react-cookie";
import {Link} from "react-router-dom";

export const UserMenu = observer(() => {
    const {t} = useTypedTranslation();
    const [cookies, setCookie, removeCookie] = useCookies(["ACCESS-TOKEN", "REFRESH-TOKEN"], {
        doNotParse: true,
    });

    useEffect(() => {

    }, [userStore.user, userStore.user?.email]);

    return (
        <div className="user-menu">
            <SvgIcon className="burger-icon" icon={BurgerIcon}/>
            <SvgIcon className="user-profile-icon" icon={UserProfileIcon}/>

            <ul className="user-menu-options">

                {userStore.user && <>
                    <li className="options-item" onClick={() => {
                        signOutService.signOut(cookies["REFRESH-TOKEN"]).then((res) => {
                            userStore.setUser(null)
                        }).catch(err => console.log(err))

                        removeCookie("REFRESH-TOKEN")
                        removeCookie("ACCESS-TOKEN")
                    }}>
                    <span className="options-item__title">
                        Выйти
                    </span>
                    </li>
                </>}

                {!userStore.user && <li className="options-item" onClick={() => authModalStore.setIsOpened(true)}>
                    <span className="options-item__title">{t("Sign In")}</span>
                </li>
                }
                {userStore.user?.isSuperuser &&
                    <Link to="/orders">
                        <li className="options-item">
                            <span className="options-item__title">{t("Orders")}</span>
                        </li>
                    </Link>
                }
            </ul>
        </div>
    )
})
