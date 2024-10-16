import "./styles.scss"
import {Form, Formik} from "formik";
import {Field} from "../../../../shared/ui/field/ui";
import {useTypedTranslation} from "../../../../app/i18n/use-typed-translation";
import {userStore} from "../../../../entities/user";
import {useEffect} from "react";
import {observer} from "mobx-react";
import {DatePicker} from "antd";
import ruRu from "antd/es/date-picker/locale/ru_RU"
import {UUID} from "../../../../shared/api/types/uuid";
import {FieldNumber} from "../../../../shared/ui/field-number";
import {snackBarStore} from "../../../../shared/ui/snack-bar/snack-bar-store";
import {createOrder} from "../api/create-order";
import {UpdateApartmentPriceDto} from "../../../../shared/api/types/update-apartment-price.dto";
import dayjs from "dayjs";

const {RangePicker} = DatePicker;

export type ValuesType = {
    username: string,
    phone: string,
    email: string,
    guestsCount: number,
    bookDateRange: string[],
    comment: string
}

type PropsType = {
    apartmentId: UUID,
    apartmentMaxGuests: number,
    onCreateOrder: Function,
    updateApartmentPrice: (dto: UpdateApartmentPriceDto) => void,
}

export const OrderApartmentForm = observer(({
                                                apartmentId,
                                                apartmentMaxGuests,
                                                onCreateOrder,
                                                updateApartmentPrice
                                            }: PropsType) => {
    const {t} = useTypedTranslation();

    useEffect(() => {
    }, [userStore.user, userStore.user?.username]);

    return (
        <Formik<ValuesType> enableReinitialize initialValues={{
            username: userStore.user?.username || "",
            email: userStore.user?.email || "",
            phone: "",
            bookDateRange: ["", ""],
            guestsCount: 0,
            comment: ""
        }} onSubmit={(values, formikHelpers) => {
            createOrder(values, apartmentId).then(() => {
                snackBarStore.showSnackBar("Ваша заявка отправлена на рассмотрение", {timeout: 5000})
                onCreateOrder()
                formikHelpers.resetForm();
            })
        }}>
            {({setFieldValue, resetForm, values}) => <Form className="order-form">
                <Field className="order-form-name" placeholder={t("Enter Your Name")} name="username"
                       label={t("Name") + " *"}/>
                <Field className="order-form-phone" placeholder="+375" type="tel" name="phone"
                       label={t("Phone") + " *"}/>
                <Field className="order-form-email" placeholder="djonson@gmail.com" type="email"
                       name="email" label={t("Email")}/>
                <FieldNumber className="order-form-people-count" min={0} max={apartmentMaxGuests}
                             onChange={(event: any) => {
                                 const todayDate = dayjs().format("YYYY-MM-DD");
                                 updateApartmentPrice({
                                     apartmentId,
                                     fromDate: values.bookDateRange[0] || todayDate,
                                     toDate: values.bookDateRange[1] || todayDate,
                                     guestsCount: event.target.value
                                 })
                             }}
                             label={t("Number Of People")} name="guestsCount"/>
                <div className="book-date field">
                    <h2 className="book-date__title field__label">{t("Check-in Date")}</h2>
                    <RangePicker locale={ruRu} className="date-picker field__field" onChange={(a, dates) => {
                        setFieldValue("bookDateRange", dates);
                        updateApartmentPrice({
                            apartmentId,
                            fromDate: dates[0],
                            toDate: dates[1],
                            guestsCount: values.guestsCount
                        })
                    }}/>
                </div>

                <Field className={"order-form-information"} as={"textarea"} name="comment"
                       placeholder={t("Additional Information")}
                       label={t("Additional Information")}/>

                <button className="order-form__submit-button submit-button"
                        type="submit">{t("Send Request")}</button>
            </Form>}

        </Formik>
    )
});