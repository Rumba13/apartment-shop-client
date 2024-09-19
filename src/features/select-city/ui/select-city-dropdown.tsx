import './styles.scss';
import clsx from "clsx";
import {City} from "../../../shared/api/types/city";
import {UseTypedTranslation} from "../../../app/i18n/use-typed-translation";
import {Select} from "../../../shared/ui/select";
import {useState} from "react";
import {CityStore} from "../model/city-store";

export type Props = {
    className?: string;
}

type SelectOption = {
    value: City,
    label: string
}

export function SelectCityDropdown({className}: Props) {
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

    return <Select className={clsx("select-city-dropdown", className)} options={selectOptions}
                   value={cityStore.city} onValueChanged={(value) => cityStore.setCity(value as City)}/>
}
