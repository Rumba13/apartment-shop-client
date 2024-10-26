import "./styles.scss"
import {authModalStore} from "../../../auth-modal/model/auth-modal-store";
import {useTypedTranslation} from "../../../../app/i18n/use-typed-translation";
import useLocalStorageState from "use-local-storage-state";
import {userStore} from "../../../../entities/user";
import {confirmModalStore} from "../../../../shared/ui/confirm-modal/confirm-modal-store";
import {signOutService} from "../../../../shared/api/sign-out-service";
import {ConfirmModalOptions} from "../../../../shared/api/types/confirm-modal-options";
import {useEffect} from "react";
import {Link} from "react-router-dom";

export function AuthModalActions() {
    const {t} = useTypedTranslation();
    const [accessToken, setAccessToken, {removeItem: removeAccessToken}] = useLocalStorageState<string>("ACCESS-TOKEN", {defaultValue: ""});
    const [refreshToken, setRefreshToken, {removeItem: removeRefreshToken}] = useLocalStorageState<string>("REFRESH-TOKEN", {defaultValue: ""});

    const signOut = () => {
        confirmModalStore.askForConfirm(confirmModalOptions)
            .then(() => signOutService.signOut(refreshToken))
            .then((res) => userStore.setUser(null)).catch(err => console.log(err))
        removeAccessToken()
        removeRefreshToken()
    }

    useEffect(() => {
    }, [userStore.user, userStore.user?.email]);

    const confirmModalOptions: ConfirmModalOptions = {
        description: t("Definitely Sign Out?"),
        confirmButtonText: t("Yes"),
    }

    // if (userStore.isLoading) {
    //     return (
    //         <div className="auth-modal-actions">
    //             <Skeleton.Input active/>
    //             <Skeleton.Avatar active style={{marginLeft:"5px"}}/>
    //         </div>
    //     )
    // }

    return (
        <div className="auth-modal-actions">
            {userStore.user && <>
                <button className="sign-out-button auth-button"
                        onClick={signOut}
                >{t("Sign Out")}</button>
            </>}

            {userStore.user?.isSuperuser && <>
                <Link className="auth-modal-link auth-button"
                      to={"/orders"}>
                    <span className="options-item__title">{t("Orders")}</span>
                </Link>
                <Link className="auth-modal-link auth-button"
                      to={"/tariffs"}>
                    <span className="options-item__title">{t("Tariffs")}</span>
                </Link>
            </>}

            {!userStore.user && <>
                <div className="open-sign-in-modal auth-button"
                     onClick={() => authModalStore.open(0)}
                >
                    <span className="options-item__title">{t("Sign In")}</span>
                </div>
                <div className="open-sign-up-modal auth-button"
                     onClick={() => authModalStore.open(1)}
                >
                    <span className="options-item__title">{t("Sign Up")}</span>
                </div>
            </>}
        </div>
    )
}