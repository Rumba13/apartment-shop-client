import './styles.scss';
import {City} from "../../../../shared/api/types/city";
import {observer} from "mobx-react";

export type Props = {
    className?: string;
}

type SelectOption = {
    value: City,
    label: string
}

export const SelectCityBigDropdown = observer(({className}: Props) => {

    return <div className={"select-city-big-dropdown"}>
        Select city
    </div>
});
