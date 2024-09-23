import "./styles.scss";
import clsx from "clsx";
import {observer} from "mobx-react";

type PropsType = {
    className?: string;
    value:boolean,
    onValueChange?: (value?: boolean) => void,
    name: string,
}

export const CheckBox = observer(({className,value,onValueChange,name}: PropsType) => (
    <label htmlFor={name} className={clsx("check-box-wrapper", className)}>
        <div className={clsx("checkbox",value && "active" )}></div>
        <input hidden name={name} id={name} type="checkbox" checked={value} onChange={(e) => onValueChange?.(e.target.checked)}/>
        <span className="check-box__title">{name}</span>
    </label>
));