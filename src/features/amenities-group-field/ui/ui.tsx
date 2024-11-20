import "./styles.scss";
import { ButtonCool } from "../../../shared/ui/button-cool";
import React from "react";
import { useTypedTranslation } from "../../../app/i18n/use-typed-translation";
import { SelectAmenitiesGroupModal, selectAmenitiesGroupModalStore } from "../../select-amenities-group-modal";

type PropsType = {
   name: string;
   _newAmenityGroup: string;
};

export function AmenitiesGroupField({ name, _newAmenityGroup }: PropsType) {
   const { t } = useTypedTranslation();

   return (
      <div className="field amenities-group-field">
         <SelectAmenitiesGroupModal name={name} _newAmenityGroup={_newAmenityGroup} />
         <h2 className="field__label">{t("Amenities")}</h2>
         <ButtonCool onClick={() => selectAmenitiesGroupModalStore.setIsOpened(true)}>Изменить</ButtonCool>
      </div>
   );
}
