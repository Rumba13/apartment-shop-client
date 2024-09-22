import './styles.scss';
import {observer} from "mobx-react";
import React from "react";
import {useTypedTranslation} from "../../../../app/i18n/use-typed-translation";
import {SvgIcon} from "../../../../shared/ui/svg-icon";
import ArrowIcon from "../../../../assets/images/arrow.svg";
import {Select} from "../../../../shared/ui/select";
import {getCitySelectOptions} from "../../get-city-select-options";
import clsx from "clsx";
import {cityStore} from "../../model/city-store";
import {City} from "../../../../shared/api/types/city";

export type Props = {
    className?: string;
}

export const SelectCityBigDropdown = observer(({className}: Props) => {
    const {t} = useTypedTranslation();

    return <div className={"select-city-big-dropdown"}>
        <span className="dropdown__title">Город</span>

        <Select noArrow wrapperClassName={clsx("dropdown-wrapper")}
                className={"dropdown"} onValueChanged={(city) => cityStore.setCity(city as City)}
                options={getCitySelectOptions(t)} value={cityStore.city}/>

        <SvgIcon icon={ArrowIcon}/>
    </div>
});
