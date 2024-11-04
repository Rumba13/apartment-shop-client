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
                  isOpened={selectGuestPricesModalStore.isOpened}
                  stopPropagation={selectGuestPricesModalStore.stopPropagationInModal}
                  onCrossClick={() => selectGuestPricesModalStore.setIsOpened(false)}>
        <SelectGuestsForm values={values}
                          maxGuestCount={maxGuestsCount}
                          onChange={onGuestChange}
                          onNextButtonClick={() => selectGuestPricesModalStore.setIsOpened(false)}/>
    </Modal>
})
