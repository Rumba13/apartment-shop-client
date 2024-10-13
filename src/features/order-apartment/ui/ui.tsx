import {Form, Formik} from "formik";
import {Field} from "../../../shared/ui/field/ui";
import {useTypedTranslation} from "../../../app/i18n/use-typed-translation";
import {userStore} from "../../../entities/user";
import {useEffect} from "react";
import {observer} from "mobx-react";

export const OrderApartmentForm = observer(() => {
    const {t} = useTypedTranslation();

    useEffect(() => {
        console.log(userStore.user?.username)
    }, [userStore.user, userStore.user?.username]);

    return (
        <Formik enableReinitialize initialValues={{
            username: userStore.user?.username || "",
            email: userStore.user?.email || "",
        }} onSubmit={(values) => {
        }}>
            {({setFieldValue}) => <Form className="order-form">
                <Field className="order-form-name" placeholder={t("Enter Your Name")} name="username"
                       label={t("Name") + " *"}/>
                <Field className="order-form-phone" placeholder="+375" type="tel" name="phone"
                       label={t("Phone") + " *"}/>
                <Field className="order-form-email" placeholder="djonson@gmail.com" type="email"
                       name="email" label={t("Email")}/>
                <Field className={"order-form-people-count"} type="number" name="peopleCount"
                       label={t("Number Of People")}/>
                <Field className={"order-form-check-in-date"} type={"date"} name="checkInDate"
                       label={t("Check-in Date")}/>
                <Field className={"order-form-check-out-date"} type={"date"} name="checkOutDate"
                       label={t("Check-out Date")}/>
                <Field className={"order-form-information"} as={"textarea"} name="additionalInformation"
                       placeholder={t("Additional Information")}
                       label={t("Additional Information")}/>

                <button className="order-form__submit-button submit-button" type="submit">{t("Send Request")}</button>
            </Form>}
        </Formik>
    )
});