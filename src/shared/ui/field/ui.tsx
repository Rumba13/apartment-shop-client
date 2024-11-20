import "./styles.scss";
import { ErrorMessage, Field as FormikField, FieldHookConfig, useField } from "formik";
import React, { useEffect } from "react";
import clsx from "clsx";
import CrossIcon from "../../../assets/images/cross.svg";
import { SvgButton } from "../svg-button";
import { values } from "mobx";
import AddImageIcon from "../../../assets/images/add-image-icon.png";
import { ButtonCool } from "../button-cool";

type PropsType = {
   label: string;
   className?: string;
   onChange?: Function;
   button?: React.ReactNode;
} & FieldHookConfig<any>;

export function Field({ label, className, onChange, button, ...props }: PropsType) {
   const [field, meta, { setValue }] = useField(props);

   let fieldComponent;

   if (props.type === "file") {
      fieldComponent = (
         <>
            <div className="field__field">
               <input
                  hidden
                  type={"file"}
                  multiple
                  name={props.name}
                  value={props.value}
                  id={props.id || props.name}
                  onChange={event => {
                     if (!event.target.files) return setValue(null);

                     const files = Array.from(event.target.files);

                     if (field.value === null) {
                        setValue([...files]);
                     } else {
                        setValue([...field.value, ...files]);
                     }
                  }}
               />
               <div className="preview-images" style={{ marginTop: field.value ? 8 : undefined }}>
                  {Array.isArray(field.value) &&
                     Array.from(field.value).map((img: any, currentImageIndex) => (
                        <div className="preview-image" key={img}>
                           <SvgButton
                              className="cross"
                              icon={CrossIcon}
                              onClick={() => {
                                 setValue(Array.from(field.value).filter((item, index) => index !== currentImageIndex));
                              }}
                           />
                           <img alt="" src={URL.createObjectURL(img)} />
                        </div>
                     ))}
                  <label className="preview-image add-image" htmlFor={props.id || props.name}>
                     <img alt="" src={AddImageIcon} />
                  </label>
               </div>
            </div>
         </>
      );
   } else {
      fieldComponent = (
         <FormikField
            {...props}
            {...field}
            on
            onChange={(event: React.ChangeEvent<any>) => {
               field.onChange(event);
               onChange?.(event);
            }}
            className={clsx("field__field")}
            name={props.name}
            id={props.id || props.name}
         />
      );
   }

   return (
      <div className={clsx("field", className)}>
         <label className="field__label" htmlFor={props.id || props.name}>
            {label}
         </label>
         <div className="wrapper">
            {fieldComponent}
            {button}
            {meta.touched && <ErrorMessage name={props.name} render={(msg: string) => <div className="field__error">{msg}</div>} />}
         </div>
      </div>
   );
}
