import './styles.scss';
import clsx from "clsx";
import {useEffect, useState} from "react";
import {SelectStore} from "../model/select-store";
import {observer} from "mobx-react";

type Option = {
    value: string;
    label: string;
}

type PropsType = {
    options: Option[],
    className?: string,
    value: string,
    onValueChanged?: (value: string) => void,
}

export const Select = observer(({options, className, value,onValueChanged}: PropsType) => {

    return (
        <div className={clsx("select-wrapper")}>
            <select className={clsx("select", className)} value={value}
                    onChange={(e) => onValueChanged?.(e.target.value)}>
                {options.map(option => <option className="select-option" value={option.value}>{option.label}</option>)}
            </select>
        </div>
    )
});

