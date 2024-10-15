import './styles.scss';
import {UUID} from "../../../../shared/api/types/uuid";
import {orderService} from "../../../../shared/api/order-service";
import {Order} from "../../../../shared/api/types/order";

type PropsType = {
    order: Order
}

export function RejectOrderButton({order}: PropsType) {

    async function rejectOrder(orderId: UUID) {
        try {
            await orderService.rejectOrder(orderId);
            order.status = "REJECTED"; //! Multiple truths
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <button className="order-reject" onClick={() => rejectOrder(order.id)}>
            Reject
        </button>
    )
}
