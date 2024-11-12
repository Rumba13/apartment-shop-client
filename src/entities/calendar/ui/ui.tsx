import "./styles.scss";
import {UUID} from "../../../shared/api/types/uuid";
import {apartmentCalendarStore} from "../model/apartment-calendar-store";
import {useEffect, useState} from "react";
import {observer} from "mobx-react";
import {currencyStore} from "../../../features/select-currency";
import {AppLoader} from "../../app-loader";
import {Calendar} from "antd";
import {useTypedTranslation} from "../../../app/i18n/use-typed-translation";
import dayjs from "dayjs";
import clsx from "clsx";
import {Apartment} from "../../../shared/api/types/apartment";
import {apartmentService} from "../../../shared/api/apartment-service";
import {CONSTANTS} from "../../../shared/lib/constants";
import {Link} from "react-router-dom";
import {CalendarCell} from "./calendar-cell";
import {Tariff} from "../../../shared/api/types/tariff";
import {tariffService} from "../../../shared/api/tariff-service";

type PropsType = {
    apartmentId: UUID
}

export const ApartmentCalendar = observer(({apartmentId}: PropsType) => {
    const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs>(dayjs())

    const {t} = useTypedTranslation();

    useEffect(() => {
        apartmentCalendarStore.loadCalendar(apartmentId, currencyStore.currency);
        apartmentCalendarStore.loadCurrentApartment(apartmentId, currencyStore.currency)
            .then(() => {
                if (!apartmentCalendarStore.apartment) return;
                apartmentCalendarStore.loadTariff(apartmentCalendarStore.apartment?.tariffId)
            })

    }, [apartmentId, currencyStore.currency]);

    if (apartmentCalendarStore.isLoading || !apartmentCalendarStore.apartment || !apartmentCalendarStore.tariff) {
        return <div
            className="apartment-calendar"><AppLoader/></div>
    }
    return <div className="apartment-calendar">
        <div className="apartment-details">
            <Link to={"/apartment-details/" + apartmentId}>
                {apartmentCalendarStore.apartment.title}
            </Link>

            <img src={CONSTANTS.IMAGE_SERVER_URL + apartmentCalendarStore.apartment.photos[0]}
                 alt=""/>
        </div>

        <Calendar value={selectedDate}
                  onChange={setSelectedDate}
                  fullCellRender={(date, info) => <CalendarCell
                      apartmentId={apartmentId}
                      //@ts-ignore
                      tariff={apartmentCalendarStore.tariff}
                      date={date}
                      info={info}
                      selectedDate={selectedDate}/>}
        />
    </div>
})