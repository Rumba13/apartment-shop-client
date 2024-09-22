import "./styles.scss";
import {Slider as MuiSlider } from "@mui/material";
import clsx from "clsx";

type PropsType = {
    className?: string;
    getLabel: (value: any) => any,
    onChange: (event: Event, value: number | number[], activeThumb: number) => void,
    max:number,
    min:number,
    value:number[]
}

export function Slider({getLabel,onChange,min,max,className,value}: PropsType) {
    return <MuiSlider
        className={clsx("slider",className)}
        value={[value[0], value[1]]}
        onChange={onChange}
        valueLabelDisplay="on"
        valueLabelFormat={getLabel}
        getAriaValueText={getLabel}
        max={max}
        min={min}
        size={"small"}
    />
}