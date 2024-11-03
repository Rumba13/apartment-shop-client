import './styles.scss';
import {Select} from "antd";
import {ErrorMessage, FieldHookConfig, useField} from "formik";
import clsx from "clsx";
import React, {useState} from "react";
import {currencyStore, SelectCurrencyDropdown} from "../../select-currency";
import {Currency} from "../../../shared/api/types/currency";
import {Price} from "../../../shared/api/types/price";
import {InputNumber} from "../../../shared/ui/input-number";

type PropsType = {
    label: string,
    className?: string,
    onValueChange?: (e: number) => void,
} & FieldHookConfig<Price | null>

export function PriceField({className, label, ...props}: PropsType) {
    const [field, meta, {setValue}] = useField(props);

    return <div className="price-field">
        <div className={clsx("field", className)}>
            <label
                className="field__label"
                htmlFor={props.id || props.name}
            >{label}</label>

            <InputNumber value={field.value?.amount || 0}
                         min={0}
                         max={Infinity}
                         onChange={(value) => setValue({currency: currencyStore.currency, amount: value})}/>


            <ErrorMessage
                className="field__error"
                name={props.name}
            />
        </div>
        <SelectCurrencyDropdown onChange={currency => setValue({currency, amount: field.value?.amount || 0})}/>
    </div>
}
