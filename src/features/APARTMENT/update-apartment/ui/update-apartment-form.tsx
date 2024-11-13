import './styles.scss';
import {Form, Formik, FormikValues} from "formik";
import React, {useEffect, useRef, useState} from "react";
import {Field} from "../../../../shared/ui/field/ui";
import {useTypedTranslation} from "../../../../app/i18n/use-typed-translation";
import {apartmentService} from "../../../../shared/api/apartment-service";
import {UUID} from "../../../../shared/api/types/uuid";
import {Apartment} from "../../../../shared/api/types/apartment";
import {currencyStore} from "../../../select-currency";
import {useNavigate} from "react-router-dom";
import {updateApartment} from "../api/update-apartment";
import useLocalStorageState from "use-local-storage-state";
import {FieldNumber} from "../../../../shared/ui/field-number";
import {IsPetAllowedField} from "../../../is-pet-allowed-field";
import {SelectGuestPricesModal, selectGuestPricesModalStore} from "../../../../widgets/select-guests-prices-modal";
import {ButtonCool} from "../../../../shared/ui/button-cool";
import {TariffField} from "../../../tariff-field";
import {AmenitiesGroupField} from "../../../amenities-group-field";
import {boolean, number, string} from "yup";
import {Currency} from "../../../../shared/api/types/currency";
import {GuestPricesByCategory} from "../../../../shared/api/types/guest-prices-by-category";
import {mapApartmentAmenitiesToObject} from "../../../../shared/lib/map-apartment-amenities-to-object";
import {CONSTANTS} from "../../../../shared/lib/constants";
import {setPhotosAbsolutePath} from "../../../../shared/lib/set-photos-absolute-path";

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
    isPetAllowed: boolean,
    _newAmenityGroup: string
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
    isPetAllowed: true,
    _newAmenityGroup: ""
}

const fetchAndConvertToBlob = async (imgUrl: string) => {
    const response = await fetch(imgUrl)
    return await response.blob()
}

const loadBlobbedApartmentImages = async (imageUrls: string[]) => {
    const blobbedImages: Blob[] = []

    console.log(1)

    for (let i = 0; i < imageUrls.length; i++) { //
        blobbedImages[i] = await fetchAndConvertToBlob(imageUrls[i]);
    }

    return blobbedImages;
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
                    setPhotosAbsolutePath(apartment.photos);


                    setUpdateApartment(apartment)
                }
            })
    }, []);

    if (!updatedApartment) {
        return <></>;
    }

    // loadBlobbedApartmentImages(updatedApartment.photos)
    //     .then(console.log)

    return <div className="update-apartment-form-wrapper">
        <span className="update-apartment-form-wrapper__title">{t("Update Apartment Data")}</span>

        <Formik<ValuesType> initialValues={{
            address: updatedApartment.address,
            description: updatedApartment.description,
            title: updatedApartment.title,
            roomCount: updatedApartment.roomQuantity,
            guestCount: updatedApartment.guestQuantity,
            area: updatedApartment.area,
            tariff: updatedApartment.tariff,
            amenityGroups: mapApartmentAmenitiesToObject(updatedApartment.amenityGroups),
            sleepPlaces: updatedApartment.sleepPlaces,
            photos: null,
            adultPrice: updatedApartment.adultPrice,
            babyPrice: updatedApartment.babyPrice,
            kidPrice: updatedApartment.kidPrice,
            petPrice: updatedApartment.petPrice,
            teenPrice: updatedApartment.teenPrice,
            currency: currencyStore.currency,
            isPetAllowed: updatedApartment.isPetAllowed,
            _newAmenityGroup: ""
        }} validate={validate} onSubmit={(values, {setSubmitting}) =>
            updateApartment(values, accessToken, apartmentId, (id: UUID) => navigate("/apartment-details/" + id))
        }>
            {({setFieldValue, values}) => (
                <Form className="update-apartment-form" id="update-apartment-form">
                    <Field name="title"
                           placeholder={"Название квартиры"}
                           label={t("Title")}/>
                    <Field name="description"
                           as="textarea"
                           style={{maxHeight: 500}}
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
                    <AmenitiesGroupField name="amenityGroups" _newAmenityGroup={values._newAmenityGroup}/>

                    <Field name="photos"
                           type="file"
                           accept={"image/*"}
                           label={t("Photos")}
                           multiple
                    />
                    <button className={"update-apartment-form__submit"}
                            type="submit">{t("Update Apartment Data")}</button>
                </Form>
            )}
        </Formik>
    </div>
}
