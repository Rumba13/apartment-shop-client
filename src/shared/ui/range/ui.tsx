import "./styles.scss";
import { Slider as MuiSlider } from "@mui/material";
import clsx from "clsx";
import { useState } from "react";

type PropsType = {
   className?: string;
   getLabel: (value: any) => any;
   onChange: (value: number[]) => void;
   onChangeCommitted?: () => void;
   max: number;
   min: number;
   value: number[];
};

export function Slider({ getLabel, onChange, min, max, className, value, onChangeCommitted }: PropsType) {
   const [activeThumb, setActiveThumb] = useState<number>(0);

   return (
      <MuiSlider
         className={clsx("slider", className)}
         onChange={(event, currentValue) => {
            if (Array.isArray(currentValue)) {
               onChange(currentValue);
            } else {
               if (activeThumb === 1) {
                  onChange([value[0], currentValue]);
               } else {
                  onChange([currentValue, value[1]]);
               }
            }
         }}
         onChangeCommitted={onChangeCommitted}
         value={value}
         valueLabelDisplay="on"
         valueLabelFormat={getLabel}
         getAriaValueText={getLabel}
         max={max}
         min={min}
         size={"small"}
      />
   );
}
