import './styles.scss';
import {UUID} from "../../../../shared/api/types/uuid";
import {orderService} from "../../../../shared/api/order-service";
import {Order} from "../../../../shared/api/types/order";
import {ConfirmModalOptions} from "../../../../shared/api/types/confirm-modal-options";
import {useTypedTranslation} from "../../../../app/i18n/use-typed-translation";
import {confirmModalStore} from "../../../../shared/ui/confirm-modal/confirm-modal-store";
import {AdminButton} from "../../../../shared/ui/admin-button";

type PropsType = {
    order: Order
}

export function RejectOrderButton({order}: PropsType) {

    const {t} = useTypedTranslation()

    async function rejectOrder(orderId: UUID) {
        try {
            await orderService.rejectOrder(orderId);
            order.status = "REJECTED"; //! Multiple truths
        } catch (err) {
            console.log(err)
        }
    }

    const modalOptions: ConfirmModalOptions = {
        description: t("Definitely reject The Order"),
        confirmButtonText: t("Reject"),
    }

    return (
        <AdminButton className="order-reject"
                     onClick={() => confirmModalStore.askForConfirm(modalOptions).then(() => rejectOrder(order.id)).catch(err => {})}
                     title={t("Reject")}/>
    )
}
