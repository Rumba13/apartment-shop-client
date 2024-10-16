import "./styles.scss";
import ruRu from "antd/es/date-picker/locale/ru_RU"
import {observer} from "mobx-react";
import {DatePicker} from "antd";
import {filterByDateStore} from "../model/filter-by-date-store";
import dayjs from "dayjs";

const {RangePicker} = DatePicker

export const ApartmentDateFilter = observer(() => {
    const [dateFrom, dateTo] = filterByDateStore.dates;

    return (
        <div className="filter-by-date">
            <span className="filters__title">Дата</span>
            <RangePicker className="apartment-date-filter"
                         locale={ruRu}
                         value={[dateFrom !== null ? dayjs(dateFrom) : null, dateFrom !== null ? dayjs(dateTo) : null]}
                         onChange={(_a, dates) => filterByDateStore.setDates(dates)}
            />
        </div>
    )
});