import "./styles.scss";
import {observer} from "mobx-react";
import {confirmModalStore} from "./confirm-modal-store";
import {useTypedTranslation} from "../../../app/i18n/use-typed-translation";
import {Modal} from "../modal";

export const ConfirmModal = observer(() => {
    const {t} = useTypedTranslation();

    if (!confirmModalStore.isOpened) return <></>

    return <Modal title=""
                  className="confirm-modal"
                  modalStore={confirmModalStore}>
        <h2 className="confirm-modal__title">{confirmModalStore.modalOptions.description}</h2>
        <button className="confirm-modal__confirm"
                onClick={confirmModalStore.confirm}>
            {confirmModalStore.modalOptions.confirmButtonText || t("Confirm")}
        </button>
        {/*<button className="confirm-modal__cancel"*/}
        {/*        onClick={confirmModalStore.cancel}*/}
        {/*>{confirmModalStore.modalOptions.cancelButtonText || t("Cancel")}*/}
        {/*</button>*/}
    </Modal>
})