import "./styles.scss"
import {Form, Formik, useFormikContext} from "formik";
import {Field} from "../../../../shared/ui/field/ui";
import {useTypedTranslation} from "../../../../app/i18n/use-typed-translation";
import {userStore} from "../../../../entities/user";
import React, {useEffect, useState} from "react";
import {observer} from "mobx-react";
import {DatePicker} from "antd";
import ruRu from "antd/es/date-picker/locale/ru_RU"
import {UUID} from "../../../../shared/api/types/uuid";
import {createOrder} from "../api/create-order";
import dayjs, {Dayjs} from "dayjs";
import {currencyStore} from "../../../select-currency";
import {OrderIsSubmittedModal} from "./order-is-submitted-modal";
import {orderIsSubmittedModalStore} from "./order-is-submitted-modal/order-is-submitted-modal-store";
import {array, number, object, string} from "yup";
import {apartmentService} from "../../../../shared/api/apartment-service";
import {RangePickerProps} from "antd/es/date-picker";
import {BookDate} from "../../../../shared/api/types/book-date";
import {t, use} from "i18next"
import {SelectGuestsFormModal, selectGuestModalStore} from "../../../../widgets/select-guests-modal";
import {getOrderPriceStore} from "../../../ORDER/get-order-price";
import {snackBarStore} from "../../../../shared/ui/snack-bar/snack-bar-store";
import CrossIcon from "../../../../assets/images/cross.svg"
import {useNavigate} from "react-router-dom";
import {orderApartmentStore} from "../model/order-apartment-store";
import {formatGuestCountByCategoryToTitle} from "../../../../shared/lib/format-guest-count-by-category-to-title";

const {RangePicker} = DatePicker;

export type ValuesType = {
    username: string,
    phone: string,
    bookDateRange: string[],
    comment: string,
    adultCount: number,
    teenCount: number,
    kidCount: number,
    babyCount: number,
    petCount: number,
}

type PropsType = {
    apartmentId: UUID,
    onCreateOrder?: Function,
    updateApartmentPrice?: () => void,
}
const phoneRegExp = /^\+?((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const orderSchema = object().shape({
    username: string().required(t("Required Field")),
    phone: string().matches(phoneRegExp, t("Invalid phone")).required(t("Required Field")),
    comment: string(),
    bookDateRange: array().required(),
    adultCount: number().required(),
    teenCount: number().required(),
    kidCount: number().required(),
    babyCount: number().required(),
    petCount: number().required(),
} as { [key in keyof ValuesType]: any })

const todayDate = dayjs().format("YYYY-MM-DD");
const tomorrowDate = dayjs().add(1, "day").format("YYYY-MM-DD");

const initialValues: ValuesType = {
    username: userStore.user?.username || "",
    phone: "",
    bookDateRange: [todayDate, tomorrowDate],
    comment: "",
    adultCount: 1,
    teenCount: 0,
    kidCount: 0,
    babyCount: 0,
    petCount: 0,
}

export const OrderApartmentForm = observer(({
                                                apartmentId,
                                                onCreateOrder
                                            }: PropsType) => {
    const {t} = useTypedTranslation();
    const [bookedDates, setBookedDates] = useState<BookDate[] | null>(null)
    const navigate = useNavigate()

    const updateOrderPrice = (values: ValuesType) => {
        getOrderPriceStore.setGuestCountByCategory({
            adultCount: values.adultCount,
            babyCount: values.babyCount,
            kidCount: values.kidCount,
            petCount: values.petCount,
            teenCount: values.teenCount
        })
        getOrderPriceStore.setBookDateRange([values.bookDateRange[0], values.bookDateRange[1]])
        getOrderPriceStore.getOrderPrice(apartmentId, currencyStore.currency)
    }

    useEffect(() => {
        updateOrderPrice(initialValues)
    }, []);

    useEffect(() => {
        orderApartmentStore.loadCurrentApartment(apartmentId, currencyStore.currency)
        getOrderPriceStore.getOrderPrice(apartmentId, currencyStore.currency)
    }, [currencyStore.currency]);

    useEffect(() => {
        apartmentService.getApartmentBookedDates(apartmentId, currencyStore.currency).then(setBookedDates);
    }, [userStore.user, userStore.user?.username, currencyStore.currency]);

    if(orderApartmentStore.currentApartment === null) return <></>

    const disabledDate: RangePickerProps['disabledDate'] = (current, info) => {
        if (current < dayjs().endOf("day")) return true;

        if (bookedDates === null) return false

        for (let i = 0; i < bookedDates.length; i++) {
            if (current.isSame(dayjs(bookedDates[i].date), "day")) return true;
        }

        if (!info.from) return false;

        if(current.subtract(1, "day").isSame(info.from)) return true;
        if(current.add(1, "day").isSame(info.from)) return true;


        let nearestPointFromLeft: Dayjs | null = null
        let nearestPointFromRight: Dayjs | null = null

        for (let i = 0; i < bookedDates.length; i++) {
            const currentDate = dayjs(bookedDates[i].date);
            const currentDiff = Math.abs(info.from.diff(currentDate, "days"))

            const diff1 = nearestPointFromLeft ? Math.abs(info.from.diff(nearestPointFromLeft, "days")) : 9999;
            const diff2 = nearestPointFromRight ? Math.abs(info.from.diff(nearestPointFromRight, "days")) : 9999;

            if (currentDate < info.from && currentDiff < diff1) nearestPointFromLeft = currentDate;
            if (currentDate > info.from && currentDiff < diff2) nearestPointFromRight = currentDate;
        }

        if (nearestPointFromLeft && current < nearestPointFromLeft) return true;
        if (nearestPointFromRight && current > nearestPointFromRight) return true;

        return false;
    };

    return <>
        <OrderIsSubmittedModal/>
        <Formik<ValuesType>
            validationSchema={orderSchema}
            validate={(values) => ({})}
            initialValues={initialValues}
            onSubmit={(values, formikHelpers) => {
                createOrder(values, apartmentId).then(() => {
                    orderIsSubmittedModalStore.setIsOpened(true)
                    onCreateOrder?.()
                    formikHelpers.resetForm();
                    navigate("/apartment-details/" + apartmentId, {relative: "route"})
                }).catch(err => snackBarStore.showSnackBar(t("Some error has occurred"), {
                    icon: CrossIcon,
                    style: {color: "red"},
                    timeout: 4500
                }))
            }}
        >
            {({setFieldValue, values}) => {
                useEffect(() => {
                    updateOrderPrice(values)
                }, [values.adultCount, values.adultCount, values.babyCount, values.teenCount, values.kidCount]);

                return <Form className="order-form">
                    <Field className="order-form-name"
                           placeholder={t("Enter Your Name")}
                           name="username"
                           label={t("Name") + " *"}
                    />
                    <Field className="order-form-phone"
                           placeholder="+375"
                           type="tel"
                           name="phone"
                           label={t("Phone") + " *"}
                    />
                    <div className="order-form-people-count">
                        <h2 className="title">{t("Number Of People")}</h2>
                        <button type="button"
                                className="button-cool"
                                onClick={() => selectGuestModalStore.setIsOpened(true)}>{formatGuestCountByCategoryToTitle(values)}
                        </button>
                    </div>
                    {/*@ts-ignore*/}
                    <SelectGuestsFormModal maxGuestsCount={orderApartmentStore.currentApartment.guestQuantity} values={values}/>
                    <div className="book-date field">
                        <h2 className="book-date__title field__label">{t("Check-in Date")}</h2>
                        <RangePicker locale={ruRu}
                                     preserveInvalidOnBlur
                                     disabledDate={disabledDate}
                                     renderExtraFooter={() => <span className="date-picker__message">{t("Minimum Booking Period: 2 Nights")}</span>}
                                     className="date-picker field__field"
                                     onChange={(a, dates) => {
                                         setFieldValue("bookDateRange", dates);
                                         if (dates[0] === "") dates[0] = todayDate;
                                         if (dates[1] === "") dates[1] = todayDate;
                                         updateOrderPrice({...values, bookDateRange: dates});
                                     }}
                        />
                    </div>

                    <Field className={"order-form-information"}
                           as={"textarea"}
                           name="comment"
                           placeholder={t("Additional Information")}
                           label={t("Additional Information")}
                    />

                    <button className="order-form__submit-button submit-button"
                            type="submit"
                    >{t("Send Request")}</button>
                </Form>
            }}
        </Formik>
    </>
});
