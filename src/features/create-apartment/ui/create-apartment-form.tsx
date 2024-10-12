import './styles.scss';
import {Form, Formik, FormikValues} from "formik";
import React from "react";
import {Field} from "../../../shared/ui/field/ui";
import {useTypedTranslation} from "../../../app/i18n/use-typed-translation";
import {RangeInput} from "../../../shared/ui/range-input/ui";
import {apartmentService} from "../../../shared/api/apartment-service.mocked";
import {signUpService} from "../../../shared/api/sign-up-service";

type FormValuesType = {}

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

export function CreateApartmentForm() {
    const {t} = useTypedTranslation();

    return <div className="create-apartment-form-wrapper">
        <span className="create-apartment-form-wrapper__title">{t("Create Apartment")}</span>

        <Formik<FormikValues> initialValues={{title: ""}} validate={validate}
                              onSubmit={(values, {setSubmitting}) => alert(JSON.stringify(values, null, 2))}>
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
                    <button className={"create-apartment-form__submit"}
                            onClick={() => {
                                apartmentService.createApartment({
                                    title: "Create Apartment",
                                    square: 20,
                                    amenities: [],
                                    address: "Gaystreet",
                                    priceAmount: 202,
                                    priceCurrency: "USD",
                                    photos: [],
                                    description: "sdadas",
                                    bedsQuantity: 3,
                                    guestQuantity: 5,
                                    roomsQuantity: 3
                                }, "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiYWNjZXNzIiwic3ViIjoiYjVhODZjNzItOTU2MC00MGNkLTkyYjYtNWVmOWU0ZjI0MTZmIiwidXNlcm5hbWUiOiJzYWRkYWQxNjU1ODY2MDc3MjEwNyIsImVtYWlsIjoic2VuZGVyaTAwNzAzMDAwOTMzODR1bTFAeWFuZGV4LmJ5IiwiZXhwIjoxNzI4NTg4NDUzfQ.tlj9K0IvdCb3QpAraBuKhyRIgXM31A4DSJV6i_TiFXHU7hOAgQYH1kGrPrl-8d4gL2QT8niHFt9NhfUYIIXPP0rFZJv8nrJ5fo4OZ_sCqoPlSkdZ4qJ68u77cEFpiWre7ot26_XKzQA5WTwMMyFFnPgTA3bCakRATYQfGfC6Qu3rPAp7MC7dCtO9Gz-Y3kjSTtyzVXA8O_0bQRwsLkOXHrqO2bihaTgbrUT7ROl69PgMhyNYGCAyiZr3FrF8SPidfDyqqaBQcVQOtS71-QZx7wwz18mDBo2lBokaw78WoUwdLME8aVetSwaqOA_fkv1BhCNJcQM0yAVYBFZN_4q59w")
                            }} type="submit">
                        {t("Add")}</button>
                </Form>
            )}
        </Formik>
    </div>
}
