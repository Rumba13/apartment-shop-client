import "./styles.scss";
import {useEffect} from "react";
import {apartmentListStore} from "../model/model";
import {observer} from "mobx-react";
import {ApartmentCard} from "../../../entities/apartment-card";

type PropsType = {
}

export const ApartmentList = observer(({}:PropsType) => {

    useEffect(() => {
        apartmentListStore.loadApartments();
    }, []);

    if(!apartmentListStore.apartments)
    {
        return <div>Loading...</div>
    }

    return <div>
        {apartmentListStore.apartments.map(apartment => <ApartmentCard apartment={apartment}/>)}
    </div>
});