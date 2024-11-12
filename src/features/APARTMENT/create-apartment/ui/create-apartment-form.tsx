import './styles.scss';
import {Form, Formik, FormikValues} from "formik";
import React from "react";
import {Field} from "../../../../shared/ui/field/ui";
import {useTypedTranslation} from "../../../../app/i18n/use-typed-translation";
import {useNavigate} from "react-router-dom";
import {createApartment} from "../api/create-apartment";
import useLocalStorageState from "use-local-storage-state";
import {SelectGuestsFormModal, selectGuestModalStore} from "../../../../widgets/select-guests-modal";
import {ButtonCool} from "../../../../shared/ui/button-cool";
import {FieldNumber} from "../../../../shared/ui/field-number";
import {TariffField} from "../../../tariff-field";
import {AmenitiesGroupField} from "../../../amenities-group-field";
import {UUID} from "../../../../shared/api/types/uuid";
import {array, mixed, number, object, string} from "yup";
import {t} from "i18next";
import {SelectGuestPricesModal, selectGuestPricesModalStore} from "../../../../widgets/select-guests-prices-modal";
import {GuestPricesByCategory} from "../../../../shared/api/types/guest-prices-by-category";
import {Currency} from "../../../../shared/api/types/currency";
import {SelectCurrencyDropdown} from "../../../select-currency";
import {PriceField} from "../../../price-field";
import {IsPetAllowedField} from "../../../is-pet-allowed-field";

export type ValuesType = {
    title: string,
    description: string
    roomCount: number
    address: string
    area: number,
    tariff: UUID | null,
    amenityGroups: { [key: string]: string[] },
    sleepPlaces: string,
    photos: any
    guestCount: number,
    currency: Currency,
    isPetAllowed: boolean
} & GuestPricesByCategory

const initialValues: ValuesType = {
    address: "",
    description: "",
    title: "",
    roomCount: 1,
    guestCount: 0,
    area: 1,
    tariff: null,
    amenityGroups: {},
    sleepPlaces: "",
    photos: null,
    adultPrice: 10,
    babyPrice: 10,
    kidPrice: 10,
    petPrice: 10,
    teenPrice: 10,
    currency: "BYN",
    isPetAllowed: true
}

const schema = object().shape({
    photos: mixed().nullable(),
    area: number().positive().required(t("Required Field")),
    sleepPlaces: string().required(t("Required Field")),
    title: string().required(t("Required Field")),
    address: string().required(t("Required Field")),
    description: string().required(t("Required Field")),
    tariff: string().required(t("Required Field")),
    amenityGroups: mixed().nullable(),

} as { [key in keyof ValuesType]: any })

export function CreateApartmentForm() {
    const {t} = useTypedTranslation();
    const navigate = useNavigate();
    const [accessToken] = useLocalStorageState<string>("ACCESS-TOKEN", {defaultValue: ""});

    const submit = (values: ValuesType) => {
        console.log(values)
        createApartment(values, accessToken, (id: UUID) => navigate("/apartment-details/" + id, {}))
    }

    return <div className="create-apartment-form-wrapper">
        <span className="create-apartment-form-wrapper__title">{t("Create Apartment")}</span>

        <Formik<ValuesType> initialValues={initialValues}
                            validationSchema={schema}
                            onSubmit={(values) => submit(values)}>
            {({values}) => (
                <Form className="create-apartment-form"
                      id="create-apartment-form">
                    <Field name="title"
                           placeholder={"Название квартиры"}
                           label={t("Title")}/>
                    <Field name="description"
                           as="textarea"
                           label={t("Apartment Description")}/>
                    <FieldNumber name="roomCount"
                                 min={1}
                                 type="number"
                                 label={t("Rooms Quantity")}/>
                    <FieldNumber name="guestCount"
                                 min={1}
                                 type="guest"
                                 label={t("Number Of People")}/>

                    <IsPetAllowedField name="isPetAllowed"/>
                    <SelectGuestPricesModal disablePets={!values.isPetAllowed}/>
                    <div className="field">
                        <h2 className="field__label">{t("Change Guests Pricing")}</h2>
                        <ButtonCool onClick={() => selectGuestPricesModalStore.setIsOpened(true)}>Изменить</ButtonCool>
                    </div>
                    <Field name="sleepPlaces"
                           placeholder="2+2+1"
                           label={t("Sleep places")}/>

                    <TariffField name="tariff"
                                 label={t("Tariffs")}/>
                    <Field name="address"
                           label={t("Address")}/>
                    <FieldNumber name="area"
                                 min={1}
                                 label={t("Area")}/>
                    <AmenitiesGroupField name="amenityGroups"/>

                    <Field name="photos"
                           type="file"
                           accept={"image/*"}
                           label={t("Photos")}
                           multiple
                    />
                    <button className="create-apartment-form__submit"
                            type="submit">{t("Add")}</button>
                </Form>
            )}
        </Formik>
    </div>
}
