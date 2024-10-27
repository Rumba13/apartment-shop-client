import "./styles.scss";
import {ErrorMessage, Field as FormikField, FieldHookConfig, useField} from "formik";
import React, {useEffect, useState} from "react";
import clsx from "clsx";
import {InputNumber} from "../input-number";

type PropsType = {
    label: string,
    className?: string,
    max?: number,
    min: number
    onValueChange?: (e: number) => void,
}& FieldHookConfig<any>

export function FieldNumber({label, className, onValueChange, max = Infinity, min, ...props}: PropsType) {
    const [field, meta, {setValue: setGlobalValue}] = useField(props);

    const setValue = (value: number) => {
        const limitedValue = Math.max(Math.min(value, max), min)
        setGlobalValue(limitedValue);
        onValueChange?.(value);
    }

    return (
        <div className={clsx("field", className)}>
            <label
                className="field__label"
                htmlFor={props.id || props.name}
            >{label}</label>

            <InputNumber value={field.value} min={min} max={max} onChange={e => setValue(e)}/>

                {/*<FormikField*/}
                {/*    {...field}*/}
                {/*    {...props}*/}
                {/*    className={clsx("field__field")}*/}
                {/*    name={props.name}*/}
                {/*    id={props.id || props.name}*/}
                {/*    value={localValue}*/}
                {/*    onChange={(event: React.ChangeEvent<any>) => setLocalValue(event.target.value)}*/}
                {/*    onBlur={(event: React.ChangeEvent<any>) => {*/}
                {/*        setValue((parseNumber(event.target.value) || min), event)*/}
                {/*    }}*/}
                {/*/>*/}

                {/*<button*/}
                {/*    className={clsx("field__increase-button", max === field.value && "disabled")}*/}
                {/*    type="button"*/}
                {/*    onClick={(event: React.ChangeEvent<any>) => setValue(field.value + 1, event)}*/}
                {/*>*/}
                {/*    <SvgIcon icon={Arrow}/>*/}
                {/*</button>*/}
                {/*<button*/}
                {/*    className={clsx("field__decrease-button", min === field.value && "disabled")}*/}
                {/*    type="button"*/}
                {/*    onClick={(event: React.ChangeEvent<any>) => setValue(field.value - 1, event)}*/}
                {/*>*/}
                {/*    <SvgIcon icon={Arrow}/>*/}
                {/*</button>*/}

            <ErrorMessage
                className="field__error"
                name={props.name}
            />
        </div>
    )
}