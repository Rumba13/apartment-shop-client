import './styles.scss';
import {Select} from "antd";
import {ErrorMessage, FieldHookConfig, useField} from "formik";
import clsx from "clsx";
import React, {useEffect, useState} from "react";
import {Tag} from "../../../shared/api/types/tag";
import {descriptionItemService} from "../../../shared/api/description-item-service";
import {CONSTANTS} from "../../../shared/lib/constants";

type PropsType = {
    label: string,
    className?: string,
    onValueChange?: (e: number) => void,
} & FieldHookConfig<any>

export function TagField({className, label, ...props}: PropsType) {
    const [field, meta, {setValue}] = useField(props);
    const [icons, setIcons] = useState<Tag[] | null>(null)

    useEffect(() => {
        descriptionItemService.loadAllDescriptionIcons().then((icons) => {
            setIcons(icons);
            setValue(icons[0])
        })
    }, []);

    return <div className={clsx("field", "tag-field", className)}>
        <label
            className="field__label"
            htmlFor={props.id || props.name}
        >{label}</label>
        <Select
            dropdownAlign={{overflow: {adjustX: false, adjustY: false}}}
            onClear={() => setValue("")}
            value={field.value}
            onChange={(tariffId,) => setValue(tariffId)}
            options={(icons || []).map(icon => ({
                label: <img alt="" src={CONSTANTS.IMAGE_SERVER_URL + icon}></img>,
                value: icon
            }))}
            dropdownStyle={{zIndex: 20}}/>
        <ErrorMessage
            className="field__error"
            name={props.name}
        />
    </div>
}
