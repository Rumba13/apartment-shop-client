import './styles.scss';
import {Modal} from "../../../shared/ui/modal";
import {observer} from "mobx-react";
import {selectDatesModalStore} from "../model/select-dates-modal-store";
import {useTypedTranslation} from "../../../app/i18n/use-typed-translation";
import dayjs from "dayjs";
import {filterByDateStore} from "../../../features/FILTER/filter-by-date";
import {Calendar, DatePicker} from "antd";
import {ButtonCool} from "../../../shared/ui/button-cool";
import {rangeDatePickerDisableDateBeforeToday} from "../../../shared/lib/range-date-picker-disable-date-before-today";

const {RangePicker} = DatePicker

type PropsType = {
    onNextButtonClick: () => void,
}

export const SelectDatesModal = observer(({onNextButtonClick}: PropsType) => {
    const {t} = useTypedTranslation()
    const [dateFrom, dateTo] = filterByDateStore.dates

    return <Modal className="welcome-modal"
                  title={t("Please Select Dates")}
                  modalStore={selectDatesModalStore}
    >
        <RangePicker className="date-filter"
                     dropdownClassName="select-dates"
                     disabledDate={rangeDatePickerDisableDateBeforeToday}
                     open
                     hidden
                     value={[!dateFrom ? null : dayjs(dateFrom), !dateTo ? null : dayjs(dateTo)]}
                     getPopupContainer={(trigger) => trigger}
                     onChange={(_a, dates) => {
                         filterByDateStore.setDates(dates)
                         onNextButtonClick?.()
                     }}
        />
        <ButtonCool className="next-button"
                    onClick={onNextButtonClick}>{t("Confirm")}</ButtonCool>
    </Modal>
})
