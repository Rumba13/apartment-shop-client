import './styles.scss';
import {useTypedTranslation} from "../../../app/i18n/use-typed-translation";
import {PriceFilter, priceFilterStore} from "../../../features/filter-by-price";
import React, {useEffect} from "react";
import {areaFilterStore, AreaFilter} from "../../../features/filter-by-space";
import {TagsList} from "../../../features/select-tags";
import {RemoveFiltersButton} from "./remove-filters/remove-filters-button";
import {tagsFilterStore} from "../../../features/select-tags/model/tags-filter-store";
import {currencyStore} from "../../../features/select-currency";
import {filtersBoundsService} from "../../../shared/api/filters-bounds-service.mocked";
import {observer} from "mobx-react";

export const Aside = observer(() => {
    const {t} = useTypedTranslation();

    useEffect(() => {
        filtersBoundsService.loadFiltersBound(currencyStore.currency).then((filtersBounds) => {
            priceFilterStore.setPriceBounds(filtersBounds.minPrice, filtersBounds.maxPrice);
            areaFilterStore.setAreaBounds(filtersBounds.minArea, filtersBounds.maxArea);
            priceFilterStore.removeFilter();
            areaFilterStore.removeFilter();
        })
    }, [currencyStore.currency]);

    return (
        <aside className="aside">
            <span className="aside__title">{t("Filters")}</span>
            <PriceFilter/>
            <AreaFilter/>
            <TagsList/>
            <RemoveFiltersButton onClick={() => {
                priceFilterStore.removeFilter();
                areaFilterStore.removeFilter();
                tagsFilterStore.removeFilter();
            }}/>
        </aside>
    )
});
