import './styles.scss';
import {Select} from "../../../shared/ui/select";
import {SelectOption} from "../../../shared/api/types/select-option";
import {observer} from "mobx-react";
import {SortBy as SortByType} from "../../../shared/api/types/sort-by";
import {sortByStore} from "../model/sort-by-store";
import {useTypedTranslation} from "../../../app/i18n/use-typed-translation";

export const SortBy = observer(() => {
    const {t} = useTypedTranslation();

    const options: SelectOption<SortByType>[] = [
        {value: "price:asc", label: t("Price Low To High")},
        {value: "price:desc", label: t("Price High To Low")},
        {value: "popularity:asc", label: t("Popularity Low To High")},
        {value: "popularity:desc", label: t("Popularity High To Low")},
    ]

    return <Select wrapperClassName={"sort-by"} options={options} value={sortByStore.selectedSortBy}
                   onValueChanged={(value) => sortByStore.setSelectedSortBy(value as SortByType)}/>
});
