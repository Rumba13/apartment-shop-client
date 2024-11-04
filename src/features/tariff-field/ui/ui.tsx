import './styles.scss';
import {Select} from "antd";
import {currencyStore} from "../../select-currency";
import {ErrorMessage, FieldHookConfig, useField} from "formik";
import clsx from "clsx";
import React, {useEffect, useState} from "react";
import {tariffService} from "../../../shared/api/tariff-service";
import {TariffShort} from "../../../shared/api/types/tariff-short";

type PropsType = {
    label: string,
    className?: string,
    onValueChange?: (e: number) => void,
} & FieldHookConfig<any>

export function TariffField({className, label, ...props}: PropsType) {
    const [field, meta, {setValue}] = useField(props);
    const [tariffs, setTariffs] = useState<TariffShort[] | null>(null)

    useEffect(() => {
        tariffService.loadTariffs().then((tariffs) => {
            setTariffs(tariffs);
            setValue(tariffs[0].title)
        })
    }, []);

    return <div className={clsx("field", "tariff-field", className)}>
        <label
            className="field__label"
            htmlFor={props.id || props.name}
        >{label}</label>
        <Select
            showSearch
            dropdownAlign={{ overflow: { adjustX: false, adjustY: false } }}
            allowClear
            onClear={() => setValue("")}
            filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
            value={field.value}
            onChange={(tariffId,) => setValue(tariffId)}
            options={(tariffs || []).map(tariff => ({label: tariff.title, value: tariff.title}))}
            dropdownStyle={{zIndex: 200000}}/>
        <ErrorMessage
            className="field__error"
            name={props.name}
        />
    </div>
}
