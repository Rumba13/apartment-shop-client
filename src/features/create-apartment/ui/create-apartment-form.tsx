import './styles.scss';
import {Form, Formik} from "formik";
import React from "react";
import {Field} from "../../../shared/ui/field/ui";
import {useTypedTranslation} from "../../../app/i18n/use-typed-translation";

export function CreateApartmentForm() {
    const {t} = useTypedTranslation();

    return <div className="create-apartment-form-wrapper">
        <span className="create-apartment-form-wrapper__title">{t("Create Apartment")}</span>

        <Formik initialValues={{title: "sdaddad"}}
                onSubmit={(values, {setSubmitting}) => alert(JSON.stringify(values, null, 2))}>
            {({}) => (
                <Form className={"create-apartment-form"}>
                    <Field placeholder={"Название квартиры"} name="title" label={t("Title")}/>
                    <Field name="description" as="textarea"  label={t("Apartment Description")}/>
                    <Field name="roomsQuantity" label={t("Rooms Quantity")}/>
                    <Field name="bedsQuantity" label={t("Beds Quantity")}/>
                    <Field name="guestsQuantity" label={t("Guests")}/>
                    <Field name="price" label={t("Price")}/>
                    <Field name="address" label={t("Address")}/>
                    <Field name="area" label={t("Area")}/>
                    <Field name="amenities" label={t("Amenities")}/>
                    <Field name="photos" label={t("Photos")}/>
                    <button className={"create-apartment-form__submit"} type="submit">{t("Add")}</button>
                </Form>
            )}</Formik>
    </div>
}
