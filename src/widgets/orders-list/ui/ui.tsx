import "./styles.scss";
import {useEffect} from "react";
import {ordersListStore} from "../model/orders-list-store";
import {observer} from "mobx-react";
import {OrderCard} from "../../../entities/order-card";
import {OrderSkeleton} from "./order-skeleton";

type PropsType = {}

export const OrdersList = observer(() => {

    useEffect(() => {
        ordersListStore.loadOrders()
    }, []);

    if (ordersListStore.isError) return <div>Error!</div>

    return (<div className="orders-list">
        {ordersListStore.isLoading && <>
            <div className="skeleton">
                <OrderSkeleton />
                <OrderSkeleton />
                <OrderSkeleton />
                <OrderSkeleton />
                <OrderSkeleton />
            </div>
        </>}
        {ordersListStore.orders.map(order => <OrderCard order={order}/>)}
    </div>)
});