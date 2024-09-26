import "./styles.scss";
import {useEffect} from "react";
import {apartmentListStore} from "../model/model";
import {observer} from "mobx-react";
import {ApartmentCard} from "../../../entities/apartment-card";
import {tagsFilterStore} from "../../../features/select-tags/model/tags-filter-store";
import {searchService} from "../../../shared/api/search-service";
import {priceFilterStore} from "../../../features/filter-by-price";
import {areaFilterStore} from "../../../features/filter-by-space";
import {useTypedTranslation} from "../../../app/i18n/use-typed-translation";
import {sortByStore} from "../../../features/sort-by/model/sort-by-store";
import LoadingGif from "../../../assets/images/loading.gif"

type PropsType = {}

export const ApartmentList = observer(({}: PropsType) => {

    const {apartments} = apartmentListStore
    const {t} = useTypedTranslation();

    useEffect(() => {
        if(!priceFilterStore.readyToSearch) return;
        console.log(1)

        searchService.search(tagsFilterStore.getSelectedTagsNames(), {
                min: priceFilterStore.minPrice,
                max: priceFilterStore.maxPrice
            },
            {
                min: areaFilterStore.minArea,
                max: areaFilterStore.maxArea
            },
            sortByStore.selectedSortBy
        ).then(apartments => {
            apartments && apartmentListStore.setApartments(apartments)
        })
    }, [tagsFilterStore.selectedTags,
        areaFilterStore.minArea,
        areaFilterStore.maxArea,
        priceFilterStore.minPrice,
        priceFilterStore.maxPrice,
        sortByStore.selectedSortBy,
        priceFilterStore.readyToSearch
    ]);

    if (!apartments) {
        return <div>Loading...</div>
    }

    return <div className="apartment-list">
        {searchService.isLoading &&
            <div className="apartment-list-loading"><img className="loading__loading" src={LoadingGif} alt=""/></div>}
        {(apartments.length === 0) ? t("Nothing Found") : apartments.map(apartment => <ApartmentCard
            apartment={apartment}/>)}
    </div>
});