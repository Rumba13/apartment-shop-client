import './styles.scss';
import {UUID} from "../../../../shared/api/types/uuid";
import {orderService} from "../../../../shared/api/order-service";
import {Order} from "../../../../shared/api/types/order";

type PropsType = {
    order:Order
}

export function ApproveOrderButton({order}:PropsType) {

    async function approveOrder(orderId:UUID) {
        try {
            await orderService.approveOrder(orderId);
            order.status = "APPROVED"; //! Multiple truths
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <button className="order-approve" onClick={() => approveOrder(order.id)}>
            Approve
        </button>
    )
}
