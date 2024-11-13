import './styles.scss';
import {UUID} from "../../../shared/api/types/uuid";
import React, {useEffect} from "react";
import {observer} from "mobx-react";
import {ApartmentCard, ApartmentCardSkeleton} from "../../../entities/apartment-card";
import {Apartment} from "../../../shared/api/types/apartment";
import {apartmentService} from "../../../shared/api/apartment-service";
import {currencyStore} from "../../../features/select-currency";
import {setPhotosAbsolutePath} from "../../../shared/lib/set-photos-absolute-path";

type PropsType = {
    favoriteApartmentIds: UUID[]
}

export const FavoriteList = observer(({favoriteApartmentIds}: PropsType) => {
    const [apartments, setApartments] = React.useState<Apartment[] | null>(null);

    useEffect(() => {
        Promise.all(favoriteApartmentIds.map((id) => apartmentService.getApartmentById(id, currencyStore.currency) as Promise<Apartment>))
            .then((apartments) => {
                apartments.forEach(apartment => setPhotosAbsolutePath(apartment.photos));
                setApartments(apartments)
            })

    }, [favoriteApartmentIds, currencyStore.currency]);

    if (apartments === null || apartments.length === 0) {
        return <div className="favorite-list">
            <ApartmentCardSkeleton/>
            <ApartmentCardSkeleton/>
            <ApartmentCardSkeleton/>
            <ApartmentCardSkeleton/>
            <ApartmentCardSkeleton/>
        </div>
    }

    return <div className="favorite-list">
        {apartments.map(apartment => <ApartmentCard apartment={apartment}/>)}
    </div>
})
