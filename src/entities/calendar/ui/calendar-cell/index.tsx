import "./styles.scss";
import { apartmentCalendarStore } from "../../model/apartment-calendar-store";
import clsx from "clsx";
import dayjs, { Dayjs } from "dayjs";
import { formatPrice } from "../../../../shared/lib/format-price";
import { currencyStore } from "../../../../features/select-currency";
import { useTypedTranslation } from "../../../../app/i18n/use-typed-translation";
import { useEffect, useState } from "react";
import { confirmModalStore } from "../../../../shared/ui/confirm-modal/confirm-modal-store";
import { ConfirmModalOptions } from "../../../../shared/api/types/confirm-modal-options";
import { calendarService } from "../../../../shared/api/calendar-service";
import { UUID } from "../../../../shared/api/types/uuid";
import { CalendarDate } from "../../../../shared/api/types/calendar-date";
import { observer } from "mobx-react";
import { Price } from "../../../../shared/api/types/price";
import { Tariff } from "../../../../shared/api/types/tariff";
import { tariffToArray } from "../../../../shared/lib/tariff-to-array";

type CellRenderInfo<DateType = Dayjs> = {
   originNode: React.ReactNode;
   today: DateType;
   range?: "start" | "end";
   type: any;
};

type PropsType = {
   date: dayjs.Dayjs;
   info: CellRenderInfo;
   selectedDate: Dayjs;
   apartmentId: UUID;
   tariff: Tariff;
};

export const CalendarCell = observer(({ date, info, selectedDate, apartmentId, tariff }: PropsType) => {
   const { t } = useTypedTranslation();
   const [isPriceInEditMode, setIsPriceInEditMode] = useState<boolean>(false);
   const [isPriceUpdating, setIsPriceUpdating] = useState<boolean>(false);

   const cellDate = apartmentCalendarStore.dates.find(d => d.date === date.format("YYYY-MM-DD")) as CalendarDate;

   useEffect(() => {}, [cellDate]);

   if (!cellDate) return <></>;

   const tariffPrices = tariffToArray(tariff);
   const priceInTariff = tariffPrices[dayjs(cellDate.date).subtract(1, "day").day()];

   function updateCellPrice(newPriceAmount: number) {
      setIsPriceUpdating(true);

      const newPrice: Price = {
         amount: newPriceAmount,
         currency: currencyStore.currency,
      };

      confirmModalStore
         .askForConfirm({
            description: `Установить новую цену в ${formatPrice(newPrice)}?`,
         })
         .then(() =>
            calendarService.updateCalendarDatePrice(apartmentId, cellDate.id, currencyStore.currency, {
               isBooked: cellDate.isBooked,
               price: newPriceAmount,
            })
         )
         .then((res: CalendarDate) => {
            const currentDateInfoIndex = apartmentCalendarStore.dates.findIndex(d => d.id === res.id);

            const newDates: CalendarDate[] = [...apartmentCalendarStore.dates];
            newDates[currentDateInfoIndex] = res;
            apartmentCalendarStore.setDates(newDates);
         })
         .catch(() => setIsPriceUpdating(false))
         .finally(() => {
            setIsPriceInEditMode(false);
            setIsPriceUpdating(false);
         });
   }

   const formattedPrice = isPriceUpdating
      ? "..."
      : formatPrice({
           amount: cellDate.price,
           currency: currencyStore.currency,
        }) + ".";

   return (
      <div className={clsx("apartment-calendar-cell", "ant-picker-calendar-date", dayjs(cellDate.date).month() === selectedDate.month() && "highlight", cellDate.isBooked && "inactive")} onDoubleClick={() => setIsPriceInEditMode(true)}>
         <div className="date-value">{date.format("D")}</div>
         <div className="content ant-picker-calendar-date-content">
            {cellDate.isBooked && cellDate.booking.username}
            {isPriceInEditMode && !isPriceUpdating ? (
               <input autoFocus className="cell__price" defaultValue={cellDate.price} onBlur={() => setIsPriceInEditMode(false)} onKeyDown={e => e.key === "Enter" && updateCellPrice(+(e.target as HTMLInputElement).value)} />
            ) : (
               <span className={clsx("cell__price", priceInTariff !== cellDate.price && !isPriceUpdating && "active")}>{formattedPrice}</span>
            )}
         </div>
      </div>
   );
});
