import './styles.scss';
import clsx from "clsx";
import Select, {Options} from "react-select";
import {City} from "../../../shared/api/types/city";
import {UseTypedTranslation} from "../../../app/i18n/use-typed-translation";

export type Props = {
    className?: string;
}

type SelectOptions = {
    value: City,
    label: string
}

export function SelectCityDropdown({className}: Props) {
    const {t} = UseTypedTranslation();

    const selectOptions: SelectOptions[] = [
        {
            label: t("Gomel"),
            value: "Gomel",
        },
        {
            label: t("Grodno"),
            value: "Grodno",
        },
        {
            label: t("Brest"),
            value: "Brest",
        },
        {
            label: t("Minsk"),
            value: "Minsk",
        },
        {
            label: t("Mogilev"),
            value: "Mogilev",
        },
    ];


    return <div className={clsx("select-city-dropdown", className)}>
        <Select options={selectOptions}/>
    </div>
}
