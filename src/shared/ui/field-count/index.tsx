import "./styles.scss";
import { FieldHookConfig, useField } from "formik";
import React from "react";
import { Field } from "../field/ui";
import clsx from "clsx";

type PropsType = {
   name: string;
   step?: number;
   min?: number;
   max?: number;
   className?: string;
} & FieldHookConfig<any>;

export function FieldCount({ onChange, min = 0, max = Infinity, className, step = 1, ...props }: PropsType) {
   const [field, meta, { setValue: _setValue, setTouched, setError }] = useField(props);

   function setValue(value: number) {
      setTouched(true);
      _setValue(Math.max(Math.min(value, max), min));
   }

   return (
      <div className={clsx("field-count", className)}>
         <Field label="" hidden {...props} />
         <div className={clsx("field-count-decrease", +field.value === min && "disable")} onPointerDown={() => setValue(+field.value - step)}>
            -
         </div>
         <span className="field-count__value">{field.value}</span>
         <div className={clsx("field-count-increase", +field.value === max && "disable")} onPointerDown={() => setValue(+field.value + step)}>
            +
         </div>
      </div>
   );
}
