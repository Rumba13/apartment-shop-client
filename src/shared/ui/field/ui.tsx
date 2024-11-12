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
    const [field, meta, {setValue}] = useField(props);

    let fieldComponent;

    if (props.type === "file") {
        fieldComponent = <input className={clsx("field__field")} type={"file"} multiple name={props.name}
                                id={props.id || props.name} onChange={(event) => {
            const files = event.target.files
            console.log(files)
            setValue(files)

            console.log(files)
        }}/>
    } else {
        fieldComponent = <FormikField {...props} {...field} on onChange={(event: React.ChangeEvent<any>) => {
            field.onChange(event);
            onChange?.(event)
        }} className={clsx("field__field")} name={props.name} id={props.id || props.name}/>
    }

    return (
        <div className={clsx("field", className)}>
            <label className="field__label"
                   htmlFor={props.id || props.name}>{label}</label>
            <div className="wrapper">
                {fieldComponent}
            </div>
        </div>
    )
}