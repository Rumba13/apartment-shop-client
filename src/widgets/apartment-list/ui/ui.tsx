import "./styles.scss";
import {useEffect} from "react";
import {apartmentListStore} from "../model/model";
import {observer} from "mobx-react";
import {ApartmentCard} from "../../../entities/apartment-card";
import {tagsFilterStore} from "../../../features/select-tags/model/tags-filter-store";
import {searchStore} from "../../../shared/api/search-store";
import {priceFilterStore} from "../../../features/filter-by-price";
import {areaFilterStore} from "../../../features/filter-by-space";
import {useTypedTranslation} from "../../../app/i18n/use-typed-translation";
import {sortByStore} from "../../../features/sort-by/model/sort-by-store";
import LoadingGif from "../../../assets/images/loading.gif"
import {currencyStore} from "../../../features/select-currency";
import {filterByDateStore} from "../../../features/filter-by-date";

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
            filterByDateStore.dates
        ).then(apartments => apartments && apartmentListStore.setApartments(apartments)
        )
    }, [tagsFilterStore.selectedTags,
        areaFilterStore.minArea,
        areaFilterStore.maxArea,
        priceFilterStore.minPrice,
        priceFilterStore.maxPrice,
        sortByStore.selectedSortBy,
        currencyStore.currency,
        priceFilterStore.isOnCooldown,
        filterByDateStore.dates
    ]);

    if (!apartmentListStore.apartments) {
        return <div>Loading...</div>
    }

    return <div className="apartment-list">
        {searchStore.isLoading &&
            <div className="apartment-list-loading"><img className="loading__loading" src={LoadingGif} alt=""/></div>}
        {(apartmentListStore.apartments.length === 0) ? t("Nothing Found") : apartmentListStore.apartments.map(apartment =>
            <ApartmentCard
                apartment={apartment}/>)}
    </div>
});