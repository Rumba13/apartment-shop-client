import "./styles.scss";
import {ErrorMessage, Field as FormikField, FieldHookConfig, useField} from "formik";
import React, {useEffect, useState} from "react";
import clsx from "clsx";
import {SvgIcon} from "../svg-icon";
import Arrow from "../../../assets/images/arrow.svg";

type PropsType = {
    label: string,
    className?: string,
    onChange?: Function,
    max: number,
    min: number
} & FieldHookConfig<any>

export function FieldNumber({label, className, onChange, max, min, ...props}: PropsType) {
    const [field, meta, {setValue: setGlobalValue}] = useField(props);
    const [localValue, setLocalValue] = useState<string>(min + "")

    const setValue = (value: number) => {
        console.log(value)
        const limitedValue = Math.max(Math.min(value , max), min)
        setGlobalValue(limitedValue);
        setLocalValue(limitedValue.toString())
    }

    return (
        <div className={clsx("field", className)}>
            <label className="field__label" htmlFor={props.id || props.name}>{label}</label>

            <div className="field-input-wrapper">
                <FormikField  {...props} {...field} value={localValue} onBlur={(event: React.ChangeEvent<any>) => {
                    const parsedValue = new RegExp("[0-9]+").exec(event.target.value) || []
                    setValue(+(parsedValue[0] || min))
                }} onChange={(event: React.ChangeEvent<any>) => {
                    setLocalValue(event.target.value)
                }} className={clsx("field__field")} name={props.name} id={props.id || props.name}/>
                <button className="field-input-increase" type="button"
                        onClick={(event: React.ChangeEvent<any>) => {
                            setValue(field.value + 1);
                        }}>
                    <SvgIcon icon={Arrow}/>
                </button>
                <button className="field-input-decrease" type="button"
                        onClick={(event: React.ChangeEvent<any>) => {
                            setValue(field.value - 1);
                        }}>
                    <SvgIcon icon={Arrow}/>
                </button>

            </div>
            <ErrorMessage className="field__error" name={props.name}/>
        </div>
    )
}