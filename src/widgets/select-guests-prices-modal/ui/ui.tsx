import './styles.scss';
import {Modal} from "../../../shared/ui/modal";
import {selectGuestPricesModalStore} from "../model/select-guest-prices-modal-store";
import {observer} from "mobx-react";
import {SelectGuestsForm} from "../../../features/select-guests";
import {GuestsCountByCategory} from "../../../shared/api/types/guests-count-by-category";

type PropsType = {
    onGuestChange?: (guestCountByCategory: GuestsCountByCategory) => void,
    values: GuestsCountByCategory,
    maxGuestsCount:number
}

export const SelectGuestPricesModal = observer(({values, onGuestChange,maxGuestsCount}: PropsType) => {

    return <Modal title={""}
                  className={"select-guest-modal"}
                  modalStore={selectGuestPricesModalStore}
    >
        <SelectGuestsForm values={values}
                          maxGuestCount={maxGuestsCount}
                          onChange={onGuestChange}
                          onNextButtonClick={() => selectGuestPricesModalStore.setIsOpened(false)}/>
    </Modal>
})
