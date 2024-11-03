import './styles.scss';
import {Form, Formik, FormikValues} from "formik";
import React from "react";
import {Field} from "../../../../shared/ui/field/ui";
import {useTypedTranslation} from "../../../../app/i18n/use-typed-translation";
import {UUID} from "../../../../shared/api/types/uuid";
import {useNavigate} from "react-router-dom";
import {createApartment} from "../api/create-apartment";
import useLocalStorageState from "use-local-storage-state";
import {SelectGuestModal, selectGuestModalStore} from "../../../../widgets/select-guests-modal";
import {GuestsCountByCategory} from "../../../../shared/api/types/guests-count-by-category";
import {ButtonCool} from "../../../../shared/ui/button-cool";

export type ValuesType = {
    title: string,
    description: string
    roomCount: number
    bedCount: number
    price: number
    address: string
    area: number
} & GuestsCountByCategory

const initialValues: ValuesType = {
    address: "",
    description: "",
    bedCount: 0,
    title: "",
    roomCount: 0,
    price: 0,
    petCount: 0,
    adultCount: 0,
    kidCount: 0,
    teenCount: 0,
    babyCount: 0,
    area: 0
}

export function CreateApartmentForm() {
    const {t} = useTypedTranslation();
    const navigate = useNavigate();
    const [accessToken] = useLocalStorageState<string>("ACCESS-TOKEN", {defaultValue: ""});

    return <div className="create-apartment-form-wrapper">
        <span className="create-apartment-form-wrapper__title">{t("Create Apartment")}</span>


        <Formik<ValuesType> initialValues={initialValues}
                            onSubmit={(values, {setSubmitting}) => createApartment(values, accessToken, (id: UUID) => navigate("/apartment-details/" + id, {}))}>
            {({values}) => (
                <Form className="create-apartment-form"
                      id="create-apartment-form">
                    <SelectGuestModal values={values}
                                      maxGuestsCount={Infinity}/>
                    <Field name="title"
                           placeholder={"Название квартиры"}
                           label={t("Title")}/>
                    <Field name="description"
                           as="textarea"
                           label={t("Apartment Description")}/>
                    <Field name="roomCount"
                           type="number"
                           label={t("Rooms Quantity")}/>
                    <Field name="bedCount"
                           type="number"
                           label={t("Beds Quantity")}/>
                    <ButtonCool onClick={() => selectGuestModalStore.setIsOpened(true)}>Изменить</ButtonCool>
                    <Field name="price"
                           type="number"
                           label={t("Price")}/>
                    <Field name="address"
                           label={t("Address")}/>
                    <Field name="area"
                           label={t("Area")}/>
                    <Field name="amenities"
                           label={t("Amenities")}/>
                    <Field name="photos"
                           type="file"
                           accept={"image/*"}
                           label={t("Photos")}
                           multiple/>
                    <button className="create-apartment-form__submit"
                            type="submit">{t("Add")}</button>
                </Form>
            )}
        </Formik>
    </div>
}
