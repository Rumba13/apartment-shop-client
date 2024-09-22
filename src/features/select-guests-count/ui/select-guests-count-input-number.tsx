import "./styles.scss";
import {observer} from "mobx-react";
import {useTranslation} from "react-i18next";
import {guestStore} from "../model/guest-store";
import {SvgIcon} from "../../../shared/ui/svg-icon";
import Arrow from "../../../assets/images/arrow.svg";
import React, {ChangeEvent, useEffect, useRef, useState} from "react";

type PropsType = {}


export const SelectGuestsCountInputNumber = observer(({}: PropsType) => {
    const {t} = useTranslation();
    const inputRef = React.createRef<HTMLInputElement>()
    const [inputValue, setInputValue] = useState<string>("");

    useEffect(() => {
        setInputValue(t("guest", {count: guestStore.guestsCount}))
    }, [guestStore.guestsCount]);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => { //TODO fix handler
        const affectedInputValue = e.target.value;
        const parsedValue = parseInt(affectedInputValue);
        const start = e.target.selectionStart || 0

        if (!Number.isNaN(parsedValue)) {
            guestStore.setGuestsCount(parsedValue);
        } else {
            setInputValue(affectedInputValue)
        }

        setTimeout(() => e.target.setSelectionRange(start, start), 1)
    }

    return (
        <div className="select-guests-count-input-number">
            <span className="input-number__title">{t("Guests")}</span>
            <input className="input-number__value" value={inputValue} ref={inputRef}
                   onChange={onChange}/>

            <button className="input-number-increase"
                    onClick={() => guestStore.setGuestsCount(guestStore.guestsCount + 1)}>
                <SvgIcon icon={Arrow}/>
            </button>
            <button className="input-number-decrease"
                    onClick={() => guestStore.setGuestsCount(guestStore.guestsCount - 1)}>
                <SvgIcon icon={Arrow}/>
            </button>
        </div>
    )
});