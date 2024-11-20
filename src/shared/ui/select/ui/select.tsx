import "./styles.scss";
import clsx from "clsx";
import { observer } from "mobx-react";

type Option = {
   value: string;
   label: string;
};

type PropsType = {
   options: Option[];
   className?: string;
   wrapperClassName?: string;
   value: string;
   onValueChanged?: (value: string) => void;
   noArrow?: boolean;
};

export const Select = observer(({ options, className, value, onValueChanged, wrapperClassName, noArrow = false }: PropsType) => {
   return (
      <div className={clsx("select-wrapper", wrapperClassName, !noArrow && "arrow")}>
         <select className={clsx("select", className)} value={value} onChange={e => onValueChanged?.(e.target.value)}>
            {options.map(option => (
               <option className="select-option" key={option.label} value={option.value}>
                  {option.label}
               </option>
            ))}
         </select>
      </div>
   );
});
