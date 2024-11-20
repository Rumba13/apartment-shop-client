import "./styles.scss";
import { ErrorMessage, FieldHookConfig, useField } from "formik";
import React, { useState } from "react";
import clsx from "clsx";
import { Select } from "antd";
import { useTypedTranslation } from "../../../app/i18n/use-typed-translation";

type PropsType = {
   className?: string;
   onValueChange?: (e: number) => void;
} & FieldHookConfig<any>;

export function IsPetAllowedField({ ...props }: PropsType) {
   const [field, meta, { setValue }] = useField(props);
   const { t } = useTypedTranslation();

   return (
      <div className={clsx("field", "is-pet-allowed-field")}>
         <label className="field__label" htmlFor={props.id || props.name}>
            {t("Are Pets Allowed?")}
         </label>
         <Select
            // dropdownAlign={{overflow: {adjustX: false, adjustY: false}}}
            onClear={() => setValue("")}
            value={field.value}
            onChange={value => setValue(value)}
            options={[
               { label: "Разрешены", value: true },
               { label: "Запрещены", value: false },
            ]}
            dropdownStyle={{ zIndex: 400 }}
         />
         <ErrorMessage className="field__error" name={props.name} />
      </div>
   );
}
