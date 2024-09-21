import './styles.scss';
import clsx from "clsx";
import {City} from "../../../../shared/api/types/city";
import {UseTypedTranslation} from "../../../../app/i18n/use-typed-translation";
import {Select} from "../../../../shared/ui/select";
import {useState} from "react";
import {CityStore} from "../../model/city-store";
import {observer} from "mobx-react";

export type Props = {
    className?: string;
}

type SelectOption = {
    value: City,
    label: string
}

export const SelectCityDropdown = observer(({className}: Props) => {
    const {t} = UseTypedTranslation();
    const [cityStore] = useState(new CityStore())

    const selectOptions: SelectOption[] = ([
        "Minsk",
        "Gomel",
        "Mogilev",
        "Brest",
        "Grodno",
        "Pinsk",
    ] as City[]).map((city: City): SelectOption => ({value: city, label: t(city)}))

    return <Select wrapperClassName={"select-city-dropdown-wrapper"}  className={clsx("select-city-dropdown", className)} options={selectOptions}
                   value={cityStore.city} onValueChanged={(value) => cityStore.setCity(value as City)}/>
});
