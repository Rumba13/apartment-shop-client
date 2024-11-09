import './styles.scss';
import {Order} from "../../../shared/api/types/order";
import NoImage from "../../../assets/images/no-image.jpg"
import React, {useEffect, useState} from "react";
import {Apartment} from "../../../shared/api/types/apartment";
import {apartmentService} from "../../../shared/api/apartment-service";
import {currencyStore} from "../../../features/select-currency";
import {CONSTANTS} from "../../../shared/lib/constants";
import {formatPrice} from "../../../shared/lib/format-price";
import {observer} from "mobx-react";
import {ApproveOrderButton} from "../../../features/ORDER/order-approve";
import {RejectOrderButton} from "../../../features/ORDER/order-reject";
import {useTypedTranslation} from "../../../app/i18n/use-typed-translation";
import dayjs from "dayjs";
import {orderStatusToOrderStatusTitle} from "./order-status-to-order-status-title";
import {Link} from "react-router-dom";

type PropsType = {
    order: Order
}

function formatDate(date: string) {
    return dayjs(date).locale("ru").format("D MMM, dd")
}

export const OrderCard = observer(({order}: PropsType) => {
    const [apartmentFromOrder, setApartmentFromOrder] = useState<Apartment | null>(null)

    const {t} = useTypedTranslation();

    useEffect(() => {
        apartmentService.getApartmentById(order.apartmentId, currencyStore.currency).then(setApartmentFromOrder)
    }, [currencyStore.currency]);

    if (!apartmentFromOrder) {
        return <></>
    }

    return (
        <div className="order">
            <div className="created-at">
                {dayjs(order.fromDate).locale("ru").format("DD.MM.YYYY hh:mm")}
            </div>

            <div className="order-main">
                <Link className="order-photo-wrapper"
                      to={`/apartment-details/${apartmentFromOrder.id}`}>
                    <img className="order-photo"
                         src={apartmentFromOrder.photos[0] ? (CONSTANTS.IMAGE_SERVER_URL + apartmentFromOrder.photos[0]) : NoImage}
                         alt=""/>
                </Link>
                <Link className="order__title"
                      to={`/apartment-details/${apartmentFromOrder.id}`}>
                    {t("Long Term Rental")}
                </Link>
                <span className="order__price">{formatPrice(order.totalPrice)}</span>
            </div>
            <div className="book-period">
                {formatDate(order.fromDate)} - {formatDate(order.toDate)}
            </div>

            <div className="order-status">
                <span className="order-status__status"> {orderStatusToOrderStatusTitle[order.status]}</span>
                {order.status === "PENDING" && <>
                    <ApproveOrderButton order={order}/>
                    <RejectOrderButton order={order}/>
                </>}
            </div>

        </div>
    )
});
