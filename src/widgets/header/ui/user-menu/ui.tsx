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
import {Link} from "react-router-dom";
import useLocalStorageState from "use-local-storage-state";
import {ConfirmModalOptions} from "../../../../shared/api/types/confirm-modal-options";
import {confirmModalStore} from "../../../../shared/ui/confirm-modal/confirm-modal-store";

export const UserMenu = observer(() => {
    const {t} = useTypedTranslation();
    const [accessToken, setAccessToken, {removeItem: removeAccessToken}] = useLocalStorageState<string>("ACCESS-TOKEN", {defaultValue: ""});
    const [refreshToken, setRefreshToken, {removeItem: removeRefreshToken}] = useLocalStorageState<string>("REFRESH-TOKEN", {defaultValue: ""});

    const confirmModalOptions: ConfirmModalOptions = {
        description: t("Definitely Sign Out?")
    }

    useEffect(() => {

    }, [userStore.user, userStore.user?.email]);

    return (
        <div className="user-menu">
            <SvgIcon className="burger-icon"
                     icon={BurgerIcon}
            />
            <SvgIcon className="user-profile-icon"
                     icon={UserProfileIcon}
            />

            <ul className="user-menu-options">

                {userStore.user && <>
                    <li className="options-item"
                        onClick={() => {
                            confirmModalStore.askForConfirm(confirmModalOptions)
                                .then(() => signOutService.signOut(refreshToken))
                                .then((res) => userStore.setUser(null)).catch(err => console.log(err))
                            removeAccessToken()
                            removeRefreshToken()
                        }}
                    >
                    <span className="options-item__title">
                        Выйти
                    </span>
                    </li>
                </>}

                {!userStore.user && <li className="options-item"
                                        onClick={() => authModalStore.setIsOpened(true)}
                >
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
