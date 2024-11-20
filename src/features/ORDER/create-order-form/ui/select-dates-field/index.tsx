import "./styles.scss";
import { ButtonCool } from "../../../../../shared/ui/button-cool";
import { selectDatesModalStore } from "../../../../../widgets/welcome-modal";
import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { selectBookDatesModalStore } from "../select-book-dates-modal/select-book-dates-modal-store";
import { SelectBookDatesModal } from "../select-book-dates-modal";
import { useField } from "formik";
import dayjs, { Dayjs } from "dayjs";
import { UUID } from "../../../../../shared/api/types/uuid";

const dateFormat = "D MMM, dd";

type PropsType = {
   apartmentId: UUID;
};

export const SelectDatesField = observer(({ apartmentId }: PropsType) => {
   const [checkInDateField, checkInDateMeta, { setValue: setCheckInDateValue }] = useField<Dayjs | null>("checkInDate");
   const [checkOutDateField, checkOutDateMeta, { setValue: setCheckOutDateValue }] = useField<Dayjs | null>("checkOutDate");

   const checkInTitle = checkInDateField.value ? dayjs(checkInDateField.value).format(dateFormat) : "Не выбрано";
   const checkOutTitle = checkOutDateField.value ? dayjs(checkOutDateField.value).format(dateFormat) : "Не выбрано";

   useEffect(() => {}, []);

   return (
      <div className="select-dates-field">
         <div className="select-dates-field-container _check-in-container">
            <h2 className="select-dates-container__title article-title">Заезд</h2>
            <h2 className="select-dates-container__sub-title article-title">{checkInTitle}</h2>
         </div>
         <div className="container-separator"></div>
         <div className="select-dates-field-container _check-out-container">
            <h2 className="select-dates-container__title article-title">Выезд</h2>
            <h2 className="select-dates-container__sub-title article-title">{checkOutTitle}</h2>
         </div>

         <ButtonCool
            className="select-dates-field__button article-button"
            onClick={() => {
               selectBookDatesModalStore.open();
               setCheckInDateValue(null);
               setCheckOutDateValue(null);
            }}>
            Изменить
         </ButtonCool>
         <SelectBookDatesModal
            apartmentId={apartmentId}
            dates={[checkInDateField.value, checkOutDateField.value]}
            setValues={dates => {
               console.log(dates);
               setCheckInDateValue(dates[0]);
               setCheckOutDateValue(dates[1]);
            }}
         />
      </div>
   );
});
