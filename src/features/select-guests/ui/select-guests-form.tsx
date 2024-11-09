import './styles.scss';
import React, {MouseEventHandler, useEffect, useState} from "react";
import {Form, Formik} from "formik";
import {SelectGuestsFormField} from "./select-guests-form-field";
import {useTypedTranslation} from "../../../app/i18n/use-typed-translation";
import {formatPrice} from "../../../shared/lib/format-price";
import {GuestsCountByCategory} from "../../../shared/api/types/guests-count-by-category";
import {observer} from "mobx-react";
import {getOrderPriceStore} from "../../ORDER/get-order-price";

type PropsType = {
    maxGuestCount: number,
    values: GuestsCountByCategory,
    onNextButtonClick: MouseEventHandler,
    onChange?: (values: GuestsCountByCategory) => void,
    noPrice?: boolean,
    noPets?:boolean
}

export const SelectGuestsForm = observer(({maxGuestCount, values, onNextButtonClick, noPrice = false, noPets = false}: PropsType) => {
    const {t} = useTypedTranslation()

    const spareGuestCount = maxGuestCount - values.kidCount - values.adultCount - values.petCount - values.babyCount - values.teenCount;

    return (
        <Form className="select-guests-form">
            <h2 className="form-title">{t("Guest Quantity")}</h2>

            <SelectGuestsFormField name="adultCount"
                                   title={t("Adults")}
                                   subTitle={t("18 years")}
                                   max={values.adultCount + spareGuestCount}
                                   min={1}/>
            <SelectGuestsFormField name="teenCount"
                                   title={t("Teens")}
                                   subTitle={t("13-17 years")}
                                   max={values.teenCount + spareGuestCount}/>
            <SelectGuestsFormField name="kidCount"
                                   title={t("Childrens")}
                                   subTitle={t("2-12 years")}
                                   max={values.kidCount + spareGuestCount}/>
            <SelectGuestsFormField name="babyCount"
                                   title={t("Babies")}
                                   subTitle={t("Younger than 2 years")}
                                   max={values.babyCount + spareGuestCount}/>
            {!noPets && <SelectGuestsFormField name="petCount"
                                    title={t("Pets")}
                                    max={values.petCount + spareGuestCount}/>}

            {!noPrice && <div className="total-price">
                <span className="total-price__title">{t("Total")}</span>
                <div className="spring"></div>
                <span className="total-price__price">{t("From")} {formatPrice(getOrderPriceStore.orderPrice)}.</span>
            </div>}

            <button className="submit-button"
                    type="button"
                    onClick={onNextButtonClick}>Сохранить и продолжить
            </button>
        </Form>
    )
})
