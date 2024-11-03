import './styles.scss';
import {useTypedTranslation} from "../../../app/i18n/use-typed-translation";
import {PriceFilter, priceFilterStore} from "../../../features/FILTER/filter-by-price";
import React, {useEffect} from "react";
import {TagsList} from "../../../features/select-tags";
import {RemoveFiltersButton} from "./remove-filters/remove-filters-button";
import {tagsFilterStore} from "../../../features/select-tags/model/tags-filter-store";
import {currencyStore} from "../../../features/select-currency";
import {observer} from "mobx-react";
import {AreaFilter, areaFilterStore} from "../../../features/FILTER/filter-by-area";
import {ApartmentDateFilter, filterByDateStore} from "../../../features/FILTER/filter-by-date";
import {FilterByGuestsCount, guestsCountStore} from "../../../features/FILTER/filter-by-guests";
import {filterBoundsStore} from "../../../features/FILTER/filter-bounds";

export const Aside = observer(() => {
    const {t} = useTypedTranslation();

    useEffect(() => {
        filterBoundsStore.loadFilterBounds(currencyStore.currency)
            .then((filtersBounds) => {
                priceFilterStore.setPriceBounds(filtersBounds.minPrice, filtersBounds.maxPrice);
                areaFilterStore.setAreaBounds(filtersBounds.minArea, filtersBounds.maxArea);
                priceFilterStore.removeFilter();
                areaFilterStore.removeFilter();
            })
        }, [currencyStore.currency]);

    return (
        <aside className="aside">
            <span className="aside__title">{t("Filters")}</span>
            <ApartmentDateFilter/>
            <FilterByGuestsCount/>
            <PriceFilter/>
            <AreaFilter/>
            <TagsList/>
            <RemoveFiltersButton onClick={() => {
                priceFilterStore.removeFilter();
                areaFilterStore.removeFilter();
                tagsFilterStore.removeFilter();
                guestsCountStore.removeFilter()
                filterByDateStore.removeFilter()
            }}/>
        </aside>
    )
});
