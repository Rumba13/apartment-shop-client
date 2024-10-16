import './styles.scss';
import {UUID} from "../../../../shared/api/types/uuid";
import {orderService} from "../../../../shared/api/order-service";
import {Order} from "../../../../shared/api/types/order";
import {ConfirmModalOptions} from "../../../../shared/api/types/confirm-modal-options";
import {useTypedTranslation} from "../../../../app/i18n/use-typed-translation";
import {confirmModalStore} from "../../../../shared/ui/confirm-modal/confirm-modal-store";

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
        <button className="order-reject"
            // onClick={() => confirmModalStore.askForConfirm(modalOptions).then(res => res ? rejectOrder(order.id) : void 0)}
                onClick={() => confirmModalStore.askForConfirm(modalOptions).then(() => rejectOrder(order.id))}

        >
            Reject
        </button>
    )
}
