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
import {GuestsCountByCategory} from "../../../../shared/api/types/guests-count-by-category";

export type ValuesType = {
    title: string,
    description: string
    roomCount: number
    address: string
    area: number,
    tariff: UUID | null,
    amenityGroups: { [key: string]: string[] },
    sleepPlaces:string,
    photos: any
} & GuestsCountByCategory

const initialValues: ValuesType = {
    address: "",
    description: "",
    title: "",
    roomCount: 1,
    petCount: 0,
    adultCount: 1,
    kidCount: 0,
    teenCount: 0,
    babyCount: 0,
    area: 1,
    tariff: null,
    amenityGroups: {},
    sleepPlaces:"",
    photos:null
}

export function CreateApartmentForm() {
    const {t} = useTypedTranslation();
    const navigate = useNavigate();
    const [accessToken] = useLocalStorageState<string>("ACCESS-TOKEN", {defaultValue: ""});

    const submit = (values:ValuesType) => {
        console.log(values)
        createApartment(values, accessToken, (id: UUID) => navigate("/apartment-details/" + id, {}))
    }

    return <div className="create-apartment-form-wrapper">
        <span className="create-apartment-form-wrapper__title">{t("Create Apartment")}</span>

        <Formik<ValuesType> initialValues={initialValues}
                            onSubmit={(values) => submit(values)}>
            {({values}) => (
                <Form className="create-apartment-form"
                      id="create-apartment-form">
                    <SelectGuestsFormModal values={values}
                                           maxGuestsCount={Infinity}/>
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
                    <div className="field">
                        <h2 className="field__label">{t("Number Of People")}</h2>
                        <ButtonCool onClick={() => selectGuestModalStore.setIsOpened(true)}>Изменить</ButtonCool>
                    </div>
                    <Field name="sleepPlaces"
                           placeholder={"2+2+1"}
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
