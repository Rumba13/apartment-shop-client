import "./styles.scss"
import {useTypedTranslation} from "../../../app/i18n/use-typed-translation";
import {observer} from "mobx-react";
import clsx from "clsx";

type PropsType = {
    className?: string;
    values: number[],
    onChange: (value: number[]) => void,
}

export const RangeInput = observer(({ values, onChange,className}: PropsType) => {
    const {t} = useTypedTranslation();

    return (
            <div className={clsx("range-inputs", className)}>
                <div className="range-input _min">
                    <span className="range-input__title">{t("From")}</span>
                    <input type="number" className="range-input__input" value={values[0]}
                           onChange={({target: {value}}) => onChange([parseInt(value), values[1]])}/>
                </div>
                <div className="range-input _max">
                    <span className="range-input__title">{t("To")}</span>
                    <input type="number" className="range-input__input" value={values[1]}
                           onChange={({target: {value}}) => onChange([values[0], parseInt(value)])}/>
                </div>
            </div>
    )
});