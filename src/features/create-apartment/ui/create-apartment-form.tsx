import './styles.scss';
import {Form, Formik, FormikValues} from "formik";
import React from "react";
import {Field} from "../../../shared/ui/field/ui";
import {useTypedTranslation} from "../../../app/i18n/use-typed-translation";
import {apartmentService} from "../../../shared/api/apartment-service";
import {userStore} from "../../../entities/user";
import {useCookies} from "react-cookie";

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
    const [cookies] = useCookies(["ACCESS-TOKEN"])

    return <div className="create-apartment-form-wrapper">
        <span className="create-apartment-form-wrapper__title">{t("Create Apartment")}</span>

        <Formik<FormikValues> initialValues={{title: ""}} validate={validate}
                              onSubmit={(values, {setSubmitting}) => {

                                  apartmentService.createApartment({
                                      title: values.title,
                                      area: values.area,
                                      amenities: [],
                                      address: values.address,
                                      price: {
                                          currency: "USD",
                                          amount: values.price
                                      },
                                      description: values.description,
                                      bedsQuantity: values.bedsQuantity,
                                      guestsQuantity: values.guestsQuantity,
                                      roomsQuantity: values.roomsQuantity,
                                      draft:false
                                  }, cookies["ACCESS-TOKEN"]).catch(console.log).then(console.log)
                              }}>
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
                            }} type="submit">
                        {t("Add")}</button>
                </Form>
            )}
        </Formik>
    </div>
}
