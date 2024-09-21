import './styles.scss';
import clsx from "clsx";
import {City} from "../../../../shared/api/types/city";
import {useTypedTranslation} from "../../../../app/i18n/use-typed-translation";
import {Select} from "../../../../shared/ui/select";
import {observer} from "mobx-react";
import {cityStore} from "../../model/city-store"
import {getCitySelectOptions} from "../../get-city-select-options";
import {SelectOption} from "../../../../shared/api/types/select-option";

export type Props = {
    className?: string;
}

export const SelectCityDropdown = observer(({className}: Props) => {
    const {t} = useTypedTranslation();
    const selectOptions: SelectOption<City>[] = getCitySelectOptions(t);

    return <Select wrapperClassName={"select-city-dropdown-wrapper"}  className={clsx("select-city-dropdown", className)} options={selectOptions}
                   value={cityStore.city} onValueChanged={(value) => cityStore.setCity(value as City)}/>
});
