import "./styles.scss";
import { ButtonCool } from "../../../../../shared/ui/button-cool";
import { selectGuestModalStore, SelectGuestsFormModal } from "../../../../../widgets/select-guests-modal";
import { createOrderFormStore } from "../../model/create-order-form-store";
import React from "react";
import { GuestsCountByCategory } from "../../../../../shared/api/types/guests-count-by-category";

type PropsType = {
   subTitle: string;
   guestCountByCategory: GuestsCountByCategory;
};

export function OrderGuestField({ subTitle, guestCountByCategory }: PropsType) {
   return (
      <div className="order-guest-field">
         <div className="order-guest-field-container">
            <h2 className="order-guest-field__title article-title">Гости</h2>
            <h2 className="order-guest-field__sub-title article-title">{subTitle}</h2>
         </div>

         <ButtonCool className="order-guest-field__button article-button" onClick={selectGuestModalStore.open}>
            Изменить
         </ButtonCool>
         <SelectGuestsFormModal maxGuestsCount={createOrderFormStore.currentApartment?.guestQuantity || 1} values={guestCountByCategory} />
      </div>
   );
}
