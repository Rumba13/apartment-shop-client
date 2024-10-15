import {MinimalLayout} from "../../minimal-layout";
import {OrdersList} from "../../../widgets/orders-list";
import {observer} from "mobx-react";
import {userStore} from "../../../entities/user";
import {useNavigate} from "react-router-dom";

export function OrdersPage() {
    const navigate = useNavigate()

    if (!userStore.user?.isSuperuser) {
        navigate("/")
        return <></>
    }

    return (
        <MinimalLayout className={"orders-page"}>
            <OrdersList/>
        </MinimalLayout>
    )
}