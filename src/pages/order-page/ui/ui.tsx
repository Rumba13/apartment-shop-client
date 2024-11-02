import './styles.scss';
import {redirect, useLocation, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {MinimalLayout} from "../../minimal-layout";
import {OrderApartmentForm} from "../../../features/APARTMENT/order-apartment";
import {formatPrice} from "../../../shared/lib/format-price";
import {currencyStore} from "../../../features/select-currency";
import {getOrderPriceStore} from "../../../features/ORDER/get-order-price";
import {observer} from "mobx-react";
import {AppLoader} from "../../../entities/app-loader";

export const OrderPage = observer(() => {
    const {apartmentId} = useParams()
    const {pathname} = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    if (!apartmentId) {
        redirect("/");
        return <></>;
    }

    return <MinimalLayout className="order-page">
        <OrderApartmentForm apartmentId={apartmentId}
                            apartmentMaxGuests={5}
                            updateApartmentPrice={() => getOrderPriceStore.getOrderPrice(apartmentId, currencyStore.currency)}
        />
        {getOrderPriceStore.isLoading || <>Order price: {formatPrice(getOrderPriceStore.orderPrice)}</>}

    </MinimalLayout>
})
