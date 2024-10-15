import './styles.scss';
import {Order} from "../../../shared/api/types/order";

type PropsType = {
    order: Order
}

export function OrderCard({order}: PropsType) {
    return (
        <div className="order">
            {JSON.stringify(order, null, 2)}
        </div>
    )
}
