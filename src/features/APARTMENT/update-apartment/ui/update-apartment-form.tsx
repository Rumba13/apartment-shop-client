import './styles.scss';
import {Form, Formik, FormikValues} from "formik";
import React, {useEffect, useRef, useState} from "react";
import {Field} from "../../../../shared/ui/field/ui";
import {useTypedTranslation} from "../../../../app/i18n/use-typed-translation";
import {apartmentService} from "../../../../shared/api/apartment-service";
import {UUID} from "../../../../shared/api/types/uuid";
import {Apartment} from "../../../../shared/api/types/apartment";
import {currencyStore} from "../../../select-currency";
import { useNavigate} from "react-router-dom";
import {updateApartment} from "../api/update-apartment";
import useLocalStorageState from "use-local-storage-state";

const validate = (values: FormikValues) => {
    const errors: any = {}

    if (values.roomsQuantity === "") {
        errors.roomsQuantity = "Required"
    } else if (values.roomsQuantity !== Math.trunc(values.roomsQuantity)) {
        errors.roomsQuantity = "Should be integer"
    } else if (!Number.isInteger(values.roomsQuantity)) {
        errors.roomsQuantity = "Should be number"
    }

    return errors;
}

type PropsType = {
    apartmentId: UUID
}

export function UpdateApartmentForm({apartmentId}: PropsType) {
    const {t} = useTypedTranslation();
    const navigate = useNavigate()
    const [accessToken] = useLocalStorageState<string>("ACCESS-TOKEN", {defaultValue: ""});

    const [updatedApartment, setUpdateApartment] = useState<Apartment | null>(null);

    useEffect(() => {
        apartmentService.getApartmentById(apartmentId, currencyStore.currency)
            .then((apartment) => {
                if (!apartment) {
                    navigate("/404")
                } else {
                    setUpdateApartment(apartment)
                }
            })
    }, []);

    if (!updatedApartment) {
        return <></>;
    }

    return <div className="update-apartment-form-wrapper">
        <span className="update-apartment-form-wrapper__title">{t("Update Apartment Data")}</span>

        <Formik<FormikValues> initialValues={{
            title: updatedApartment.title,
            description: updatedApartment.description,
            roomsQuantity: updatedApartment.roomsQuantity,
            guestsQuantity: updatedApartment.guestsQuantity,
            price: updatedApartment.price.amount,
            area: updatedApartment.area,
            amenities: undefined,
            address: updatedApartment.address,
            bedsQuantity: updatedApartment.bedsQuantity,
        }} validate={validate} onSubmit={(values, {setSubmitting}) =>
            updateApartment(values, accessToken, apartmentId, (id: UUID) => navigate("/apartment-details/" + id))
        }>
            {({setFieldValue}) => (
                <Form className="update-apartment-form" id="update-apartment-form">
                    <Field placeholder={"Название квартиры"} name="title" label={t("Title")}/>
                    <Field name="description" as="textarea" label={t("Apartment Description")}/>
                    <Field name="roomsQuantity" type="number" label={t("Rooms Quantity")}/>
                    <Field name="bedsQuantity" type="number" label={t("Beds Quantity")}/>
                    <Field name="guestsQuantity" type="number" label={t("Guests")}/>
                    <Field name="price" type="number" label={t("Price")}/>
                    <Field name="address" label={t("Address")}/>
                    <Field name="area" label={t("Area")}/>
                    <Field name="amenities" label={t("Amenities")}/>
                    <Field onChange={(event: any) => setFieldValue("photo", event.currentTarget.files)} name="photos"
                           type="file" accept={"image/*"} label={t("Photos")} multiple/>
                    <button className={"update-apartment-form__submit"} type="submit">{t("Add")}</button>
                </Form>
            )}
        </Formik>
    </div>
}
