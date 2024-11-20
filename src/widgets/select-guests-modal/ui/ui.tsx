import "./styles.scss";
import { Modal } from "../../../shared/ui/modal";
import { selectGuestModalStore } from "../model/select-guest-modal-store";
import { observer } from "mobx-react";
import { SelectGuestsForm } from "../../../features/select-guests";
import { GuestsCountByCategory } from "../../../shared/api/types/guests-count-by-category";
import { useEffect } from "react";

type PropsType = {
   onGuestChange?: (guestCountByCategory: GuestsCountByCategory) => void;
   values: GuestsCountByCategory;
   maxGuestsCount: number;
};

export const SelectGuestsFormModal = observer(({ values, onGuestChange, maxGuestsCount }: PropsType) => {
   return (
      <Modal title={""} className={"select-guest-modal"} modalStore={selectGuestModalStore}>
         <SelectGuestsForm values={values} maxGuestCount={maxGuestsCount} onChange={onGuestChange} onNextButtonClick={() => selectGuestModalStore.setIsOpened(false)} />
      </Modal>
   );
});
