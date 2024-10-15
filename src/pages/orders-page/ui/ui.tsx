import {MinimalLayout} from "../../minimal-layout";
import {OrdersList} from "../../../widgets/orders-list";
import {observer} from "mobx-react";

export function OrdersPage() {

    return (
        <MinimalLayout className={"orders-page"}>
            <OrdersList/>
        </MinimalLayout>
    )
}