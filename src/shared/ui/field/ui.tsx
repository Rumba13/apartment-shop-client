import "./styles.scss";
import {ErrorMessage, Field as FormikField, FieldHookConfig, useField} from "formik";
import React from "react";
import clsx from "clsx";

type PropsType = {
    label: string
} & FieldHookConfig<any>

export function Field({label, ...props}: PropsType) {
    const [field, meta] = useField(props);

    return (
        <div className="field">
            <label className="field__label" htmlFor={props.id || props.name}>{label}:</label>
            <FormikField {...props} {...field} className={clsx("field__field", props.className)} name={props.name} id={props.id || props.name}/>
            <ErrorMessage className={"field__error"} name={props.name}/>
        </div>
    )
}