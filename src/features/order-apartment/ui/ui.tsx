import "./styles.scss"
import {Form, Formik} from "formik";
import {Field} from "../../../shared/ui/field/ui";
import {useTypedTranslation} from "../../../app/i18n/use-typed-translation";
import {userStore} from "../../../entities/user";
import {useEffect} from "react";
import {observer} from "mobx-react";
import {DatePicker} from "antd";
import ruRu from "antd/es/date-picker/locale/ru_RU"
import {orderService} from "../../../shared/api/order-service";
import {UUID} from "../../../shared/api/types/uuid";

const {RangePicker} = DatePicker;

type ValuesType = {
    username: string,
    phone: string,
    email: string,
    guestsCount: number,
    bookDateRange: string[],
    comment: string
}

type PropsType = {
    apartmentId: UUID,
}

export const OrderApartmentForm = observer(({apartmentId}:PropsType) => {
    const {t} = useTypedTranslation();

    useEffect(() => {
        console.log(userStore.user?.username)
    }, [userStore.user, userStore.user?.username]);

    return (
        <Formik<ValuesType> enableReinitialize initialValues={{
            username: userStore.user?.username || "",
            email: userStore.user?.email || "",
            phone: "",
            bookDateRange: ["", ""],
            guestsCount: 3,
            comment: ""
        }} onSubmit={(values) => {

            orderService.createOrder({
                apartmentId: apartmentId,
                comment: values.comment,
                fromDate: values.bookDateRange[0],
                toDate: values.bookDateRange[0],
                username: values.username,
                phoneNumber: values.phone,
                guestsQuantity: values.guestsCount
            }).then(console.log)
        }}>
            {({setFieldValue}) => <Form className="order-form">
                <Field className="order-form-name" placeholder={t("Enter Your Name")} name="username"
                       label={t("Name") + " *"}/>
                <Field className="order-form-phone" placeholder="+375" type="tel" name="phone"
                       label={t("Phone") + " *"}/>
                <Field className="order-form-email" placeholder="djonson@gmail.com" type="email"
                       name="email" label={t("Email")}/>
                <Field className={"order-form-people-count"} type="number" name="guestsCount"
                       label={t("Number Of People")}/>
                {/*<Field className={"order-form-check-in-date"} type={"date"} name="checkInDate"*/}
                {/*       label={t("Check-in Date")}/>*/}
                {/*<Field className={"order-form-check-out-date"} type={"date"} name="checkOutDate"*/}
                {/*       label={t("Check-out Date")}/>*/}
                <div className="book-date field">
                    <h2 className="book-date__title field__label">{t("Check-in Date")}</h2>
                    <RangePicker locale={ruRu} className="date-picker field__field" onChange={(a, values) => {
                        setFieldValue("bookDateRange", values);
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