import "./styles.scss";
import {UUID} from "../../../shared/api/types/uuid";
import {apartmentCalendarStore} from "../model/apartment-calendar-store";
import {useEffect} from "react";
import {observer} from "mobx-react";
import {currencyStore} from "../../../features/select-currency";
import {AppLoader} from "../../app-loader";
import {Calendar} from "antd";
import {formatPrice} from "../../../shared/lib/format-price";
import clsx from "clsx";
import {useTranslation} from "react-i18next";
import {useTypedTranslation} from "../../../app/i18n/use-typed-translation";

type PropsType = {
    apartmentId: UUID
}


export const ApartmentCalendar = observer(({apartmentId}: PropsType) => {

    const {t} = useTypedTranslation();

    useEffect(() => {
        apartmentCalendarStore.loadCalendar(apartmentId, currencyStore.currency);
    }, [apartmentId,currencyStore.currency]);

    console.log(apartmentCalendarStore.dates)

    if (apartmentCalendarStore.isLoading) {
        return <div
            className="apartment-calendar"><AppLoader/></div>
    }
    return <div className="apartment-calendar">
        <Calendar cellRender={(date, info) => {
            const currentDateInfo = apartmentCalendarStore.dates
                .find((d) => d.date === date.format("YYYY-MM-DD"))

            if(!currentDateInfo) return <></>

            return <div className={clsx("apartment-calendar-cell")}>
                <span className="cell__price">{formatPrice({amount:currentDateInfo.price, currency:currencyStore.currency})}</span>


                {currentDateInfo.isBooked && t("Booked")}
            </div>
        }}/>
    </div>
})