import "./styles.scss";
import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import { parseNumber } from "../../lib/parse-number";
import { SvgIcon } from "../svg-icon";
import Arrow from "../../../assets/images/arrow.svg";

type PropsType = {
   value: number;
   onChange?: (val: number) => void;
   min: number;
   max: number;
   name?: string;
   id?: string;
   className?: string;
   disabled?: boolean;
};
//TODO Сущность слишком умна и опасна. Нужно пристально следить за ней
export const InputNumber = ({ min, value, onChange, max, name, id, className, disabled }: PropsType) => {
   const [localValue, setLocalValue] = useState<string>(min + "");
   const inputRef = React.createRef<HTMLInputElement>();

   const setValue = (value: number) => {
      const limitedValue = Math.max(Math.min(value, max), min);
      setLocalValue(limitedValue.toString());
      onChange?.(limitedValue);
   };

   useEffect(() => {
      setLocalValue(value + "");
   }, [value]);

   return (
      <div className={clsx("input-number", className, disabled && "disable")}>
         <input
            ref={inputRef}
            type="text"
            disabled={disabled}
            className={clsx("input-number__input", disabled && "disable")}
            name={name}
            id={id || name}
            value={localValue}
            onKeyDown={(e: React.ChangeEvent<any> & React.KeyboardEvent<any>) => {
               if (e.key !== "Enter") return;
               setValue(parseNumber(e.target.value) || min);
            }}
            onChange={(event: React.ChangeEvent<any>) => {
               setLocalValue(event.target.value);
            }}
            onBlur={(event: React.ChangeEvent<any>) => {
               setValue(parseNumber(event.target.value) || min);
            }}
         />
         <button disabled={disabled} tabIndex={-1} className={clsx("input-number__increase-button", (max === value || disabled) && "disabled")} type="button" onClick={(event: React.ChangeEvent<any>) => setValue(value + 1)}>
            <SvgIcon icon={Arrow} />
         </button>
         <button disabled={disabled} tabIndex={-1} className={clsx("input-number__decrease-button", (min === value || disabled) && "disabled")} type="button" onClick={(event: React.ChangeEvent<any>) => setValue(value - 1)}>
            <SvgIcon icon={Arrow} />
         </button>
      </div>
   );
};
