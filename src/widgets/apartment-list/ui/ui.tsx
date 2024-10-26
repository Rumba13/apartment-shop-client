import "./styles.scss";
import {useEffect, useState} from "react";
import {apartmentListStore} from "../model/apartment-list-store";
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
import {Pagination} from "antd"
import {guestStore} from "../../../features/select-guests-count";

type PropsType = {}

export const ApartmentList = observer(({}: PropsType) => {
    const {t} = useTypedTranslation();

    useEffect(() => {
        if (searchStore.isSearchOnCooldown) {
            searchStore.setSearchOnCooldown()
            return;
        }
        if (priceFilterStore.isOnCooldown) {
            return;
        }
        searchStore.setSearchOnCooldown()

        const tags = tagsFilterStore.getSelectedTagsNames()

        searchStore.search({
            minPrice: priceFilterStore.minPrice,
            maxPrice: priceFilterStore.maxPrice,
            minArea: areaFilterStore.minArea,
            maxArea: areaFilterStore.maxArea,
            resultCurrency: currencyStore.currency,
            page: apartmentListStore.currentPage,
            pageSize: apartmentListStore.pageSize,
            sortBy: sortByStore.selectedSortBy,
            minGuestsQuantity: 0,
            maxGuestsQuantity: guestsCountStore.maxGuestsCount,
            fromDate: filterByDateStore.dates[0] || undefined,
            toDate: filterByDateStore.dates[1] || undefined,
            amenities: tags.length === 0 ? undefined : tags.join(", ")
        }).then(pagination => {
            console.log(pagination)
            apartmentListStore.setApartments(pagination.content)
            apartmentListStore.setCurrentPage(pagination.pageNumber);
            apartmentListStore.setTotalPages(pagination.totalPages);
        })

    }, [tagsFilterStore.selectedTags,
        areaFilterStore.minArea,
        areaFilterStore.maxArea,
        priceFilterStore.minPrice,
        priceFilterStore.maxPrice,
        sortByStore.selectedSortBy,
        currencyStore.currency,
        priceFilterStore.isOnCooldown,
        filterByDateStore.dates,
        guestsCountStore.maxGuestsCount,
        apartmentListStore.currentPage
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
            <ApartmentCard apartment={apartment}
                           key={apartment.id}/>)}
    </div>
});