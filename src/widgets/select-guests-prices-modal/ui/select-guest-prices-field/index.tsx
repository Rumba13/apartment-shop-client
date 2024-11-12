import "./styles.scss";
import React from "react";
import {FieldNumber} from "../../../../shared/ui/field-number";

type PropsType = {
    title: string;
    subTitle?: string;
    name: string,
    disable?:boolean
}

export function SelectGuestPricesField({title, subTitle, name,disable = false}: PropsType) {//remove classsees
    return <div className="select-guests-form-field select-guest-prices-form-field">
        <div className="field-description">
            <span className="title">{title}</span>
            <span className="sub-title">{subTitle}</span>
        </div>

        <FieldNumber label={""} min={0} name={name} disabled={disable}/>
    </div>
}