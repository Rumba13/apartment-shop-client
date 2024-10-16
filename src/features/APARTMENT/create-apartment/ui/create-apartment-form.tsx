import './styles.scss';
import {Form, Formik, FormikValues} from "formik";
import React from "react";
import {Field} from "../../../../shared/ui/field/ui";
import {useTypedTranslation} from "../../../../app/i18n/use-typed-translation";
import {UUID} from "../../../../shared/api/types/uuid";
import {useNavigate} from "react-router-dom";
import {createApartment} from "../api/create-apartment";
import {validate} from "../lib/validate-form";
import useLocalStorageState from "use-local-storage-state";

export function CreateApartmentForm() {
    const {t} = useTypedTranslation();
    const navigate = useNavigate();
    const [accessToken] = useLocalStorageState<string>("ACCESS-TOKEN", {defaultValue: ""});

    return <div className="create-apartment-form-wrapper">
        <span className="create-apartment-form-wrapper__title">{t("Create Apartment")}</span>

        <Formik<FormikValues> initialValues={{title: ""}} validate={validate}
                              onSubmit={(values, {setSubmitting}) => createApartment(values, accessToken, (id: UUID) => navigate("/apartment-details/" + id, {}))}>
            {({}) => (
                <Form className="create-apartment-form" id="create-apartment-form">
                    <Field placeholder={"Название квартиры"} name="title" label={t("Title")}/>
                    <Field name="description" as="textarea" label={t("Apartment Description")}/>
                    <Field name="roomsQuantity" type="number" label={t("Rooms Quantity")}/>
                    <Field name="bedsQuantity" type="number" label={t("Beds Quantity")}/>
                    <Field name="guestsQuantity" type="number" label={t("Guests")}/>
                    <Field name="price" type="number" label={t("Price")}/>
                    <Field name="address" label={t("Address")}/>
                    <Field name="area" label={t("Area")}/>
                    <Field name="amenities" label={t("Amenities")}/>
                    <Field name="photos" type="file" accept={"image/*"} label={t("Photos")} multiple/>
                    <button className="create-apartment-form__submit" type="submit">{t("Add")}</button>
                </Form>
            )}
        </Formik>
    </div>
}
