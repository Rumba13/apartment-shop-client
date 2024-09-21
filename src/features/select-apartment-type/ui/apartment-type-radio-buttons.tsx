import "./styles.scss";
import {observer} from "mobx-react";
import {UseTypedTranslation} from "../../../app/i18n/use-typed-translation";
import {apartmentTypeStore} from "../model/apartment-type-store";
import {ApartmentType} from "../../../shared/api/types/apartment-type";
import {ApartmentTypeRadioButton} from "./radio-item";

export const ApartmentTypeRadioButtons = observer(() => {
    const {t} = UseTypedTranslation();

    return (
        <div className="apartment-type-radio-buttons">
            <ApartmentTypeRadioButton value={"Apartment"}
                                      title={t("Apartments")}
                                      currentSelected={apartmentTypeStore.apartmentType}
                                      onChange={(type) => apartmentTypeStore.setApartmentType(type as ApartmentType)}/>
            <ApartmentTypeRadioButton value={"House"}
                                      title={t("Houses")}
                                      currentSelected={apartmentTypeStore.apartmentType}
                                      onChange={(type) => apartmentTypeStore.setApartmentType(type as ApartmentType)}/>
        </div>
    )
});