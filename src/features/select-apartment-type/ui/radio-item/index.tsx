import clsx from "clsx";
import {apartmentTypeStore} from "../../model/apartment-type-store";

type PropsType = {
    title: string,
    value: string,
    onChange: (value: string) => void,
    currentSelected: string
}
//TODO Decide whether refactoring is needed or not(For example, Move some ui to shared/radio-button)

export function ApartmentTypeRadioButton({title, value, onChange, currentSelected}: PropsType) {
    return <label className={clsx("apartment-type-radio-button", currentSelected === value && "selected")} htmlFor={value}>
        <input name="apartment-type" type="radio" value={value} id={value} onChange={() => onChange(value)} hidden/>
        <span className="radio-button__title">{title}</span>
    </label>
}
