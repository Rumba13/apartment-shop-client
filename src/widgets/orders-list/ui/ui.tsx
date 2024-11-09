import "./styles.scss";
import {useEffect} from "react";
import {ordersListStore} from "../model/orders-list-store";
import {observer} from "mobx-react";
import {OrderCard} from "../../../entities/order-card";
import {OrderSkeleton} from "./order-skeleton";
import {useTypedTranslation} from "../../../app/i18n/use-typed-translation";

type PropsType = {}

export const OrdersList = observer(() => {

    const {t} = useTypedTranslation()

    useEffect(() => {
        ordersListStore.loadOrders()
    }, []);

    if (ordersListStore.isError) return <div className="orders-list">{t("Some error has occurred")}</div>
    if (ordersListStore.isLoading) return <div className="orders-list">
        <div className="skeleton">
            <OrderSkeleton/>
            <OrderSkeleton/>
            <OrderSkeleton/>
            <OrderSkeleton/>
            <OrderSkeleton/>
        </div>
    </div>
    if (ordersListStore.orders.length === 0) return <div className="orders-list">{t("Nothing Found")}</div>

    return (<div className="orders-list">
        {ordersListStore.isLoading && <>
            <div className="skeleton">
                <OrderSkeleton/>
                <OrderSkeleton/>
                <OrderSkeleton/>
                <OrderSkeleton/>
                <OrderSkeleton/>
            </div>
        </>}
        {ordersListStore.orders.map(order => <OrderCard order={order}/>)}
    </div>)
});