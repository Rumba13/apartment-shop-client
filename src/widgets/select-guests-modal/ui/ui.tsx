import './styles.scss';
import {Modal} from "../../../shared/ui/modal";
import {selectGuestModalStore} from "../model/select-guest-modal-store";
import {observer} from "mobx-react";
import {SelectGuestsForm} from "../../../features/select-guests";
import {GuestsCountByCategory} from "../../../shared/api/types/guests-count-by-category";

type PropsType = {
    onGuestChange?: (guestCountByCategory: GuestsCountByCategory) => void,
    values: GuestsCountByCategory,
    maxGuestsCount:number
}

export const SelectGuestModal = observer(({values, onGuestChange,maxGuestsCount}: PropsType) => {

    return <Modal title={""}
                  className={"select-guest-modal"}
                  isOpened={selectGuestModalStore.isOpened}
                  stopPropagation={selectGuestModalStore.stopPropagationInModal}
                  onCrossClick={() => selectGuestModalStore.setIsOpened(false)}>
        <SelectGuestsForm values={values}
                          maxGuestCount={maxGuestsCount}
                          onChange={onGuestChange}
                          onNextButtonClick={() => selectGuestModalStore.setIsOpened(false)}/>
    </Modal>
})
