import "./styles.scss";
import {observer} from "mobx-react";
import {Modal} from "../../../../../shared/ui/modal";
import {orderIsSubmittedModalStore} from "./order-is-submitted-modal-store";
import {useTypedTranslation} from "../../../../../app/i18n/use-typed-translation";

type PropsType = {}

export const OrderIsSubmittedModal = observer(({}: PropsType) => {
    const {t} = useTypedTranslation()


    return <Modal className="order-is-submitted-modal"
                  title={t("Order is successfully submitted")}
                  modalStore={orderIsSubmittedModalStore}
>

        <div className="content">
            Ваша заявка на аренду квартиры успешно отправлена и передана на рассмотрение.
            Мы свяжемся с вами в ближайшее время для уточнения деталей. Благодарим за то, что выбрали нас!

            <button className="submit-button" onClick={() => orderIsSubmittedModalStore.setIsOpened(false)}>OK</button>
        </div>
    </Modal>
})