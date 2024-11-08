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

type PropsType = {
    apartmentId: UUID
}

export const ApartmentCalendar = observer(({apartmentId}: PropsType) => {
    const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs>(dayjs())
    const [apartment, setApartment] = useState<Apartment | null>(null)
    const {t} = useTypedTranslation();

    useEffect(() => {
        apartmentCalendarStore.loadCalendar(apartmentId, currencyStore.currency);
        apartmentService.getApartmentById(apartmentId, currencyStore.currency).then(setApartment)
    }, [apartmentId, currencyStore.currency]);

    if (apartmentCalendarStore.isLoading || !apartment) {
        return <div
            className="apartment-calendar"><AppLoader/></div>
    }
    return <div className="apartment-calendar">
        <div className="apartment-details">
            <Link to={"/apartment-details/" + apartmentId}>
                {apartment.title}
            </Link>

            <img src={CONSTANTS.IMAGE_SERVER_URL + apartment.photos[0]}
                 alt=""/>
        </div>

        <Calendar value={selectedDate}
                  onChange={setSelectedDate}
                  fullCellRender={(date, info) => <CalendarCell date={date}
                                                                info={info}
                                                                selectedDate={selectedDate}/>}
        />
    </div>
})