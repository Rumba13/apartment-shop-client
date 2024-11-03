import "./styles.scss";
import {observer} from "mobx-react";
import clsx from "clsx";
import {confirmModalStore} from "./confirm-modal-store";
import {useTypedTranslation} from "../../../app/i18n/use-typed-translation";
import CrossIcon from "../../../assets/images/cross.svg";
import {SvgButton} from "../svg-button";

export const ConfirmModal = observer(() => {

    const {t} = useTypedTranslation();

    if (!confirmModalStore.isOpened) return <></>

    return <div className={clsx("confirm-modal")}
                onClick={confirmModalStore.stopPropagationInModal}
    >
        <SvgButton className="close"
                   icon={CrossIcon}
                   onClick={() => confirmModalStore.cancel()}/>
        <h2 className="confirm-modal__title">
            {confirmModalStore.modalOptions.description}

        </h2>
        <button className="confirm-modal__confirm"
                onClick={confirmModalStore.confirm}
        >{confirmModalStore.modalOptions.confirmButtonText || t("Confirm")}
        </button>
        {/*<button className="confirm-modal__cancel"*/}
        {/*        onClick={confirmModalStore.cancel}*/}
        {/*>{confirmModalStore.modalOptions.cancelButtonText || t("Cancel")}*/}
        {/*</button>*/}
    </div>
})