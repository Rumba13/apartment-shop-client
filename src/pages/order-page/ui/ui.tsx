import './styles.scss';
import {redirect, useLocation, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {MinimalLayout} from "../../minimal-layout";
import {OrderApartmentForm} from "../../../features/APARTMENT/order-apartment";
import {formatPrice} from "../../../shared/lib/format-price";
import {getOrderPriceStore} from "../../../features/ORDER/get-order-price";
import {observer} from "mobx-react";
import {Apartment} from "../../../shared/api/types/apartment";
import {apartmentService} from "../../../shared/api/apartment-service";
import {currencyStore} from "../../../features/select-currency";

export const OrderPage = observer(() => {
    const {apartmentId} = useParams()
    const {pathname} = useLocation();
    const [currentApartment, setCurrentApartment] = useState<Apartment | null>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => {
        apartmentId && apartmentService.getApartmentById(apartmentId, currencyStore.currency)
            .then(setCurrentApartment).catch(console.error);
    }, []);

    if (!apartmentId) {
        redirect("/");
        return <></>;
    }

    return <MinimalLayout className="order-page">
        <OrderApartmentForm apartmentId={apartmentId} apartmentMaxGuests={currentApartment?.guestQuantity || 1}
        />
        {(getOrderPriceStore.isLoading && getOrderPriceStore.orderPrice.amount === 0) || <>Order price: {formatPrice(getOrderPriceStore.orderPrice)}</>}

    </MinimalLayout>
})
