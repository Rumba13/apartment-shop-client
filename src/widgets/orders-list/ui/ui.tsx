import "./styles.scss";
import {useEffect} from "react";
import {ordersListStore} from "../model/orders-list-store";
import {observer} from "mobx-react";
import {OrderCard} from "../../../entities/order-card";

type PropsType = {}

export const OrdersList = observer(() => {

    useEffect(() => {
        ordersListStore.loadOrders()
    }, []);

    if (ordersListStore.isError) return <div>Error!</div>
    if (ordersListStore.isLoading) return <div>Loading...</div>

    return (<div className="orders-list">
        {ordersListStore.orders.map(order => <OrderCard order={order}/>)}
    </div>)
});