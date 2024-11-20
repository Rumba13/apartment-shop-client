import "./styles.scss";
import { selectDatesModalStore } from "../../../../../widgets/welcome-modal";
import { rangeDatePickerDisableDateBeforeToday } from "../../../../../shared/lib/range-date-picker-disable-date-before-today";
import dayjs, { Dayjs } from "dayjs";
import { filterByDateStore } from "../../../../FILTER/filter-by-date";
import { ButtonCool } from "../../../../../shared/ui/button-cool";
import { Modal } from "../../../../../shared/ui/modal";
import { useTypedTranslation } from "../../../../../app/i18n/use-typed-translation";
import { DatePicker } from "antd";
import { selectBookDatesModalStore } from "./select-book-dates-modal-store";
import ruRu from "antd/es/date-picker/locale/ru_RU";
import React, { useEffect, useState } from "react";
import { RangePickerProps } from "antd/es/date-picker";
import { BookDate } from "../../../../../shared/api/types/book-date";
import { apartmentService } from "../../../../../shared/api/apartment-service";
import { currencyStore } from "../../../../select-currency";
import { userStore } from "../../../../../entities/user";
import { UUID } from "../../../../../shared/api/types/uuid";

const { RangePicker } = DatePicker;

const todayDate = dayjs().format("YYYY-MM-DD");

type PropsType = {
   dates: (Dayjs | null)[];
   setValues: (values: (Dayjs | null)[]) => void;
   apartmentId: UUID;
};

export const SelectBookDatesModal = ({ setValues, dates: _dates, apartmentId }: PropsType) => {
   const dates = [!_dates[0] ? null : dayjs(_dates[0]), !_dates[1] ? null : dayjs(_dates[1])];
   const [bookedDates, setBookedDates] = useState<BookDate[] | null>(null);
   useEffect(() => {
      apartmentService.getApartmentBookedDates(apartmentId, currencyStore.currency).then(setBookedDates);
   }, [currencyStore.currency]);

   const disabledDate: RangePickerProps["disabledDate"] = (current, info) => {
      if (current < dayjs().endOf("day")) return true;

      if (!bookedDates) return false;

      for (let i = 0; i < bookedDates.length; i++) {
         if (current.isSame(dayjs(bookedDates[i].date), "day")) return true;
      }

      if (!info.from) return false;

      if (current.subtract(1, "day").isSame(info.from)) return true;
      if (current.add(1, "day").isSame(info.from)) return true;

      let nearestPointFromLeft: Dayjs | null = null;
      let nearestPointFromRight: Dayjs | null = null;

      for (let i = 0; i < bookedDates.length; i++) {
         const currentDate = dayjs(bookedDates[i].date);
         const currentDiff = Math.abs(info.from.diff(currentDate, "days"));

         const diff1 = nearestPointFromLeft ? Math.abs(info.from.diff(nearestPointFromLeft, "days")) : 9999;
         const diff2 = nearestPointFromRight ? Math.abs(info.from.diff(nearestPointFromRight, "days")) : 9999;

         if (currentDate < info.from && currentDiff < diff1) nearestPointFromLeft = currentDate;
         if (currentDate > info.from && currentDiff < diff2) nearestPointFromRight = currentDate;
      }

      if (nearestPointFromLeft && current < nearestPointFromLeft) return true;
      if (nearestPointFromRight && current > nearestPointFromRight) return true;

      return false;
   };

   const { t } = useTypedTranslation();

   return (
      <Modal className="select-book-dates-modal" title={t("Please Select Dates")} modalStore={selectBookDatesModalStore}>
         <RangePicker
            locale={ruRu}
            preserveInvalidOnBlur
            disabledDate={disabledDate}
            variant="borderless"
            popupClassName="select-dates"
            open
            hidden
            getPopupContainer={trigger => trigger}
            renderExtraFooter={() => <span className="date-picker__message">{t("Minimum Booking Period: 2 Nights")}</span>}
            className="date-picker field__field"
            value={[dates[0], dates[1]]}
            onCalendarChange={dates => {
               console.log(1);
            }}
            onChange={(a, dates) => {
               setValues([dayjs(dates[0]), dayjs(dates[1])]);

               selectBookDatesModalStore.close();
            }}
         />
         <ButtonCool className="next-button" onClick={selectBookDatesModalStore.close}>
            {t("Confirm")}
         </ButtonCool>
      </Modal>
   );
};
