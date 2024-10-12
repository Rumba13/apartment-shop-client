import './styles.scss';
import {observer} from "mobx-react";
import {orderModalStore} from "../model/order-modal-store";
import clsx from "clsx";
import {useTypedTranslation} from "../../../app/i18n/use-typed-translation";
import {SvgButton} from "../../../shared/ui/svg-button";
import CrossIcon from "../../../assets/images/cross.svg";
import {Price} from "../../../shared/api/types/price";
import {currencyToPostfixMap} from "../../../shared/lib/currency-to-postfix-map";
import {Form, Formik} from "formik";
import {Field} from "../../../shared/ui/field/ui";
import {currencyStore} from "../../../features/select-currency";
import {useEffect} from "react";

type PropsType = {
    apartmentImage: any,
    apartmentAddress: string,
    apartmentPrice: Price
}

export const OrderModal = observer(({apartmentPrice, apartmentImage, apartmentAddress}: PropsType) => {
    const {t} = useTypedTranslation();

    useEffect(() => {

    }, [currencyStore.currency]);

    return (
        <div className={clsx("order-modal", orderModalStore.isOpened && "opened")} aria-hidden={!orderModalStore.isOpened}
             onClick={orderModalStore.stopPropagationInModal}>
            <header className="order-modal-header">
                <h2 className="header__title">
                    {t("Book Apartment")}
                </h2>
                <SvgButton className={"order-modal-close"} icon={CrossIcon}
                           onClick={() => orderModalStore.setIsOpened(false)}/>
            </header>
            <div className="order-modal-content">
                <Formik initialValues={{}} onSubmit={(values) => {
                }}>
                    {({}) => <Form className="order-form">
                        <Field className={"order-form-name"} placeholder={t("Enter Your Name")} name="name"
                               label={t("Name") + " *"}/>
                        <Field className={"order-form-phone"} placeholder={"+375"} type={"tel"} name="phone"
                               label={t("Phone") + " *"}/>
                        <Field className={"order-form-email"} placeholder={"djonson@gmail.com"} type={"email"}
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
                <div className="apartment-details">
                    <img className="apartment-details__image" src={apartmentImage} alt=""/>
                    <span className="apartment-details__address">{apartmentAddress}</span>
                    <span
                        className="apartment-details__price">{apartmentPrice.amount}{currencyToPostfixMap[currencyStore.currency]}.</span>
                </div>
            </div>
        </div>
    )
});
