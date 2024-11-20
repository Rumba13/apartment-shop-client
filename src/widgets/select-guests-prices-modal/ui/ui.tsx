import "./styles.scss";
import { Modal } from "../../../shared/ui/modal";
import { selectGuestPricesModalStore } from "../model/select-guest-prices-modal-store";
import { observer } from "mobx-react";
import { SelectGuestPricesField } from "./select-guest-prices-field";
import { useTypedTranslation } from "../../../app/i18n/use-typed-translation";
import React from "react";
import { SelectCurrencyDropdown } from "../../../features/select-currency";

type PropsType = {
   // onGuestChange?: (guestCountByCategory: GuestsCountByCategory) => void,
   // values: GuestsCountByCategory,
   // maxGuestsCount:number
   disablePets: boolean;
};

export const SelectGuestPricesModal = observer(({ disablePets }: PropsType) => {
   const { t } = useTypedTranslation();

   return (
      <Modal title={""} className="select-guest-prices-modal guest-modal" modalStore={selectGuestPricesModalStore}>
         <h2 className="form-title">
            {t("Change Guests Pricing")}
            <SelectCurrencyDropdown />{" "}
         </h2>

         <SelectGuestPricesField name="adultPrice" title={t("Adult Price")} subTitle={t("18 years")} />
         <SelectGuestPricesField name="teenPrice" title={t("Teen Price")} subTitle={t("13-17 years")} />
         <SelectGuestPricesField name="kidPrice" title={t("Kid Price")} subTitle={t("2-12 years")} />
         <SelectGuestPricesField name="babyPrice" title={t("Baby Price")} subTitle={t("Younger than 2 years")} />
         <SelectGuestPricesField name="petPrice" title={t("Pet Price")} disable={disablePets} />

         <button className="submit-button" onClick={selectGuestPricesModalStore.close} type="button">
            Сохранить и продолжить
         </button>
      </Modal>
   );
});
