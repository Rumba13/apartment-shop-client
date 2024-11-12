import "./styles.scss";
import ruRu from "antd/es/date-picker/locale/ru_RU"
import {observer} from "mobx-react";
import {DatePicker} from "antd";
import {filterByDateStore} from "../model/filter-by-date-store";
import dayjs, {Dayjs} from "dayjs";
import {
    rangeDatePickerDisableDateBeforeToday
} from "../../../../shared/lib/range-date-picker-disable-date-before-today";
import {useTypedTranslation} from "../../../../app/i18n/use-typed-translation";

const {RangePicker} = DatePicker

export const ApartmentDateFilter = observer(() => {
    const [dateFrom, dateTo] = filterByDateStore.dates;
    const {t} = useTypedTranslation();

    return (
        <div className="filter-by-date">
            <span className="filters__title">Дата</span>
            <RangePicker className="apartment-date-filter"
                         locale={ruRu}
                         placeholder={[t("Check in"), t("Check out")]}
                         disabledDate={rangeDatePickerDisableDateBeforeToday}
                         value={[!dateFrom ? null : dayjs(dateFrom), !dateTo ? null : dayjs(dateTo)]}
                         onChange={(_a, dates) => filterByDateStore.setDates(dates)}
            />
        </div>
    )
});