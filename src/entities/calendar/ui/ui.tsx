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
    const [apartment, setApartment] = useState<Apartment | null>(null)
    const [apartmentTariff, setApartmentTariff] = useState<Tariff | null>(null)

    const {t} = useTypedTranslation();

    useEffect(() => {
        apartmentCalendarStore.loadCalendar(apartmentId, currencyStore.currency);
        apartmentService.getApartmentById(apartmentId, currencyStore.currency).then((apartment) => {
            setApartment(apartment)

            if(!apartment)  {
                throw new Error("No apartment when loading calendar")
            }

            return tariffService.loadTariff(apartment.tariffId)
        })
            .then(setApartmentTariff)
    }, [apartmentId, currencyStore.currency]);

    if (apartmentCalendarStore.isLoading || !apartment || !apartmentTariff) {
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
                  fullCellRender={(date, info) => <CalendarCell
                      apartmentId={apartmentId}
                      tariff={apartmentTariff}
                      date={date}
                      info={info}
                      selectedDate={selectedDate}/>}
        />
    </div>
})