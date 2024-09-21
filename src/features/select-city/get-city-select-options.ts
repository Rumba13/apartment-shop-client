import {City} from "../../shared/api/types/city";
import {SelectOption} from "../../shared/api/types/select-option";


export function getCitySelectOptions(t:Function) {
    const selectOptions: SelectOption<City>[] = ([
        "Minsk",
        "Gomel",
        "Mogilev",
        "Brest",
        "Grodno",
        "Pinsk",
    ] as City[]).map((city: City): SelectOption<City> => ({value: city, label: t(city)}))

    return selectOptions;
}