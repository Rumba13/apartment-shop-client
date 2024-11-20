import "./styles.scss";
import { FieldCount } from "../../../../shared/ui/field-count";
import React from "react";

type PropsType = {
   title: string;
   subTitle?: string;
   max?: number;
   min?: number;
   name: string;
};

export function SelectGuestsFormField({ title, subTitle, max, min, name }: PropsType): JSX.Element {
   return (
      <div className="select-guests-form-field">
         <div className="field-description">
            <span className="title">{title}</span>
            <span className="sub-title">{subTitle}</span>
         </div>

         <FieldCount name={name} max={max} min={min} />
      </div>
   );
}
