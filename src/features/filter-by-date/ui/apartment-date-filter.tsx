import "./styles.scss";
import ruRu from "antd/es/date-picker/locale/ru_RU"
import {observer} from "mobx-react";
import {useTypedTranslation} from "../../../app/i18n/use-typed-translation";
import {DatePicker} from "antd";
import {filterByDateStore} from "../model/filter-by-date-store";

const {RangePicker} = DatePicker

export const ApartmentDateFilter = observer(() => {
    const {t} = useTypedTranslation();

    return (
        <RangePicker className="apartment-type-radio-buttons" locale={ruRu} onChange={(_a, dates) => {
            filterByDateStore.setDates(dates)
            console.log(dates)

        }}/>
    )
});