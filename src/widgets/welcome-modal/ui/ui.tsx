import "./styles.scss";
import { Modal } from "../../../shared/ui/modal";
import { observer } from "mobx-react";
import { selectDatesModalStore } from "../model/select-dates-modal-store";
import dayjs from "dayjs";
import { filterByDateStore } from "../../../features/FILTER/filter-by-date";
import { DatePicker } from "antd";
import { ButtonCool } from "../../../shared/ui/button-cool";
import { rangeDatePickerDisableDateBeforeToday } from "../../../shared/lib/range-date-picker-disable-date-before-today";
import { useTranslation } from "react-i18next";

const { RangePicker } = DatePicker;

type PropsType = {
   onNextButtonClick: () => void;
};

export const SelectDatesModal = observer(({ onNextButtonClick }: PropsType) => {
   const { t } = useTranslation();
   const [dateFrom, dateTo] = filterByDateStore.dates;

   return (
      <Modal className="welcome-modal" title={t("Please Select Dates")} modalStore={selectDatesModalStore}>
         <RangePicker
            className="date-filter"
            popupClassName="select-dates"
            variant="borderless"
            disabledDate={rangeDatePickerDisableDateBeforeToday}
            open
            hidden
            value={[!dateFrom ? null : dayjs(dateFrom), !dateTo ? null : dayjs(dateTo)]}
            getPopupContainer={trigger => trigger}
            onChange={(_a, dates) => {
               filterByDateStore.setDates(dates);
               onNextButtonClick?.();
            }}
         />
         <div className="modal-footer">
            <ButtonCool className="cancel-button" onClick={selectDatesModalStore.close}>
               {t("Cancel")}
            </ButtonCool>
            <ButtonCool className="next-button" onClick={onNextButtonClick}>
               {t("Confirm")}
            </ButtonCool>
         </div>
      </Modal>
   );
});
