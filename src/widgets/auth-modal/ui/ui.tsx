import './styles.scss';
import {authModalStore} from "../model/auth-modal-store";
import {observer} from "mobx-react";
import clsx from "clsx";
import {SvgButton} from "../../../shared/ui/svg-button";
import CrossIcon from "../../../assets/images/cross.svg";
import {useTypedTranslation} from "../../../app/i18n/use-typed-translation";
import {SignUpForm} from "../../../features/sign-up";
import {SignInForm} from "../../../features/sign-in";
import {snackBarStore} from "../../../shared/ui/snack-bar/snack-bar-store";

export const AuthModal = observer(() => {
    const {t} = useTypedTranslation()

    return <div className={clsx("auth-modal", authModalStore.isOpened && "opened")}
                onClick={authModalStore.stopPropagationInModal}>
        <SvgButton className={"auth-modal-close"} icon={CrossIcon}
                   onClick={() => authModalStore.setIsOpened(false)}/>

        <div className="auth-modal-tabs">
            {[t("Sign In"), t("Sign Up")]
                .map((tabTitle, index) => <button key={tabTitle}
                    className={clsx("auth-modal-tab", index === authModalStore.activeTab && "active")}
                    onClick={() => authModalStore.setActiveTab(index)}>{tabTitle}</button>)
            }
        </div>
        <div className="content">
            {authModalStore.activeTab === 0 && (
                <SignInForm onSignIn={() => {
                    authModalStore.setIsOpened(false)
                    snackBarStore.showSnackBar("Авторизация прошла успешно")
                }}/>
            )}
            {authModalStore.activeTab === 1 && (
                <SignUpForm onSignUp={() => {
                    authModalStore.setIsOpened(false)
                    snackBarStore.showSnackBar("Авторизация прошла успешно")
                }}/>
            )}
        </div>
    </div>
})
