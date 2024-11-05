import {apartmentCalendarStore} from "../../model/apartment-calendar-store";
import clsx from "clsx";
import dayjs, {Dayjs} from "dayjs";
import {formatPrice} from "../../../../shared/lib/format-price";
import {currencyStore} from "../../../../features/select-currency";
import {useTypedTranslation} from "../../../../app/i18n/use-typed-translation";

type CellRenderInfo<DateType = Dayjs> = {
    originNode: React.ReactNode,
    today: DateType,
    range?: 'start' | 'end',
    type: any,
};

type PropsType = {
    date: dayjs.Dayjs,
    info: CellRenderInfo,
    selectedDate:Dayjs,
}

export function CalendarCell({date,info,selectedDate}: PropsType) {
    const {t} = useTypedTranslation()

    const currentDateInfo = apartmentCalendarStore.dates
        .find((d) => d.date === date.format("YYYY-MM-DD"))

    if (!currentDateInfo) return <></>
    // console.log(selectedDate.format("YYYY-MM-DD"), info.today.format("YYYY-MM-DD"))

    return <div className={clsx("apartment-calendar-cell", "ant-picker-cell-inner", "ant-picker-calendar-date", dayjs(currentDateInfo.date).month() === selectedDate.month() && "highlight", currentDateInfo.isBooked && "inactive")}
                onDoubleClick={() => {}}>
        <div className="ant-picker-calendar-date-value">{date.locale("ru").format("D")}</div>
        <div className="content ant-picker-calendar-date-content">
                           <span className="cell__price">{t("Price")}: {formatPrice({
                               amount: currentDateInfo.price,
                               currency: currencyStore.currency
                           })}</span>
            {currentDateInfo.isBooked && t("Booked")}
        </div>
    </div>
}