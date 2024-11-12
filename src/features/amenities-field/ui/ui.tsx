import './styles.scss';
import {Select} from "antd";
import {ErrorMessage, FieldHookConfig, useField} from "formik";
import clsx from "clsx";
import React, {useEffect, useState} from "react";
import {SelectCurrencyDropdown} from "../../select-currency";
import {tagsService} from "../../../shared/api/tags-service";
import {Tag} from "../../../shared/api/types/tag";

type PropsType = {
    label: string,
    className?: string,
    onValueChange?: (e: number) => void,
} & FieldHookConfig<Tag | null>

export function AmenitiesField({className, label, ...props}: PropsType) {
    const [field, meta, {setValue}] = useField(props);
    const [amenities, setAmenities] = useState<string[] | null>(null)

    useEffect(() => {
        tagsService.loadTags().then((amenities) => {
            setAmenities(amenities);
        })
    }, []);

    return <div className={clsx("field amenities-field", className)}>
        <label
            className="field__label"
            htmlFor={props.id || props.name}
        >{label}</label>

        <Select
            showSearch
            allowClear
            mode="multiple"
            onClear={() => setValue("")}
            filterOption={(input, option) => (option?.label ?? '    ').toLowerCase().includes(input.toLowerCase())}
            value={field.value}
            onChange={tariffId => setValue(tariffId)}
            options={(amenities || []).map(amenity => ({label: amenity, value: amenity}))}
            dropdownStyle={{zIndex: 200000}}/>

        <ErrorMessage
            className="field__error"
            name={props.name}
        />
    </div>

}
