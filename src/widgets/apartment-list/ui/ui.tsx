import "./styles.scss";
import {useEffect} from "react";
import {apartmentListStore} from "../model/model";
import {observer} from "mobx-react";
import {ApartmentCard} from "../../../entities/apartment-card";
import {tagsStore} from "../../../features/select-tags/model/tags-store";
import {searchService} from "../../../shared/api/search-service";
import {filterByPriceStore} from "../../../features/filter-by-price";
import {filterByAreaStore} from "../../../features/filter-by-space";

type PropsType = {}

export const ApartmentList = observer(({}: PropsType) => {

    useEffect(() => {
        searchService.search(tagsStore.getSelectedTagsNames(), {
                min: filterByPriceStore.minPrice,
                max: filterByPriceStore.maxPrice
            },
            {
                min: filterByAreaStore.minArea,
                max: filterByAreaStore.maxArea
            }
        ).then(apartmentListStore.setApartments)
    }, [tagsStore.selectedTags, filterByAreaStore.minArea, filterByAreaStore.maxArea, filterByPriceStore.minPrice, filterByPriceStore.maxPrice]);

    if (!apartmentListStore.apartments) {
        return <div>Loading...</div>
    }

    return <div>
        {apartmentListStore.apartments.map(apartment => <ApartmentCard apartment={apartment}/>)}
    </div>
});