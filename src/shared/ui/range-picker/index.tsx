import "./styles.scss"
import React from "react";
import {DatePicker} from "antd";
import {RangePickerProps} from "antd/es/date-picker";
import clsx from "clsx";
import {createPortal} from "react-dom";

type PropsType = {
    dropdownClassName?: string;
    renderInId:string
} & RangePickerProps

export function RangePickerDropdown({renderInId, ...props}: PropsType) {

    return createPortal( <div className="range-picker">
        <DatePicker.RangePicker hidden
                                style={{display: "none" }}
                                dropdownClassName={clsx("only-dropdown", props.dropdownClassName)}
                                open {...props}/>
    </div>, document.querySelector("#a") as HTMLElement);
}