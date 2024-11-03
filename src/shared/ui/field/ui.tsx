import "./styles.scss";
import {ErrorMessage, Field as FormikField, FieldHookConfig, useField} from "formik";
import React from "react";
import clsx from "clsx";

type PropsType = {
    label: string,
    className?: string,
    onChange?: Function
} & FieldHookConfig<any>

export function Field({label, className, onChange, ...props}: PropsType) {
    const [field, meta] = useField(props);

    return (
        <div className={clsx("field", className)}>
            <label className="field__label"
                   htmlFor={props.id || props.name}>{label}</label>
            <div className="wrapper">

                <FormikField {...props} {...field} onChange={(event: React.ChangeEvent<any>) => {
                    field.onChange(event);
                    onChange?.(event)
                }}
                             className={clsx("field__field")}
                             name={props.name}
                             id={props.id || props.name}/>
                {meta.touched && <ErrorMessage name={props.name}
                                               render={(msg: string) => <div className="field__error">{msg}</div>}/>}
            </div>
        </div>
    )
}