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

type PropsType = {}

export const ApartmentList = observer(({}: PropsType) => {

    const {apartments} = apartmentListStore
    const {t} = useTypedTranslation();

    useEffect(() => {
        searchService.search(tagsFilterStore.getSelectedTagsNames(), {
                min: priceFilterStore.minPrice,
                max: priceFilterStore.maxPrice
            },
            {
                min: areaFilterStore.minArea,
                max: areaFilterStore.maxArea
            }
        ).then(apartmentListStore.setApartments)
    }, [tagsFilterStore.selectedTags, areaFilterStore.minArea, areaFilterStore.maxArea, priceFilterStore.minPrice, priceFilterStore.maxPrice]);

    if (!apartments) {
        return <div>Loading...</div>
    }



    return <div>
        {(apartments.length === 0) ? t("Nothing Found") :apartments.map(apartment => <ApartmentCard apartment={apartment}/>)}
    </div>
});