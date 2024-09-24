import './styles.scss';
import {useTypedTranslation} from "../../../app/i18n/use-typed-translation";
import {PriceFilter, priceFilterStore} from "../../../features/filter-by-price";
import React from "react";
import {areaFilterStore, AreaFilter} from "../../../features/filter-by-space";
import {TagsList} from "../../../features/select-tags";
import {RemoveFiltersButton} from "./remove-filters/remove-filters-button";
import {tagsFilterStore} from "../../../features/select-tags/model/tags-filter-store";

export function Aside() {
    const {t} = useTypedTranslation();

    return (
        <aside className="aside">
            <span className="aside__title">{t("Filters")}</span>
            <PriceFilter/>
            <AreaFilter/>
            <TagsList/>
            <RemoveFiltersButton onClick={() => {
                priceFilterStore.removeFilter();
                areaFilterStore.removeFilter();
                tagsFilterStore.removeFilter()
            }}/>
        </aside>
    )
}
