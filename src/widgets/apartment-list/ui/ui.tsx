import "./styles.scss";
import {useEffect, useState} from "react";
import {apartmentListStore} from "../model/model";
import {observer} from "mobx-react";
import {ApartmentCard, ApartmentCardSkeleton} from "../../../entities/apartment-card";
import {tagsFilterStore} from "../../../features/select-tags/model/tags-filter-store";
import {searchStore} from "../../../shared/api/search-store";
import {priceFilterStore} from "../../../features/FILTER/filter-by-price";
import {useTypedTranslation} from "../../../app/i18n/use-typed-translation";
import {sortByStore} from "../../../features/sort-by/model/sort-by-store";
import LoadingGif from "../../../assets/images/loading.gif"
import {currencyStore} from "../../../features/select-currency";
import {filterByDateStore} from "../../../features/FILTER/filter-by-date";
import {areaFilterStore} from "../../../features/FILTER/filter-by-area";
import {guestsCountStore} from "../../../features/FILTER/filter-by-guests";

type PropsType = {}

export const ApartmentList = observer(({}: PropsType) => {
    const {t} = useTypedTranslation();

    useEffect(() => {
        if (searchStore.isSearchOnRequestCooldown) {
            searchStore.setSearchOnCooldown()
            return;
        }
        if (priceFilterStore.isOnCooldown) {
            return;
        }
        searchStore.setSearchOnCooldown()

        searchStore.search(tagsFilterStore.getSelectedTagsNames(), {
                min: priceFilterStore.minPrice,
                max: priceFilterStore.maxPrice
            },
            {
                min: areaFilterStore.minArea,
                max: areaFilterStore.maxArea
            }, sortByStore.selectedSortBy, currencyStore.currency,
            guestsCountStore.maxGuestsCount,
            filterByDateStore.dates
        ).then(apartments => apartments && apartmentListStore.setApartments(apartments))
    }, [tagsFilterStore.selectedTags,
        areaFilterStore.minArea,
        areaFilterStore.maxArea,
        priceFilterStore.minPrice,
        priceFilterStore.maxPrice,
        sortByStore.selectedSortBy,
        currencyStore.currency,
        priceFilterStore.isOnCooldown,
        filterByDateStore.dates,
        guestsCountStore.maxGuestsCount
    ]);

    if (!apartmentListStore.apartments) { //initial loading
        return <div className="apartment-list">
            <ApartmentCardSkeleton/>
            <ApartmentCardSkeleton/>
            <ApartmentCardSkeleton/>
            <ApartmentCardSkeleton/>
            <ApartmentCardSkeleton/>
            <ApartmentCardSkeleton/>
            <ApartmentCardSkeleton/>
        </div>
    }

    return <div className="apartment-list">
        {searchStore.isLoading &&
            <div className="apartment-list-loading">
                <img className="loading__loading"
                     src={LoadingGif}
                     alt=""/>
            </div>}

        {(apartmentListStore.apartments.length === 0) ? t("Nothing Found") : apartmentListStore.apartments.map(apartment =>
            <ApartmentCard apartment={apartment} key={apartment.id}/>)}
    </div>
});