import './styles.scss';
import {useParams} from "react-router-dom";
import {MinimalLayout} from "../../minimal-layout";
import {ApartmentDetails} from "../../../entities/apartment-details";
import {useEffect, useState} from "react";
import {Apartment} from "../../../shared/api/types/apartment";
import {apartmentService} from "../../../shared/api/apartment-service";

export function ApartmentDetailsPage() {
    const [currentApartment, setCurrentApartment] = useState<Apartment | null>(null);

    const {apartmentId} = useParams()

    useEffect(() => {
        apartmentService.getApartmentById(apartmentId as string).then(setCurrentApartment);
    }, [apartmentId]);

    if (!currentApartment) {
        return <div>Loading...</div>
    }

    return <MinimalLayout className={"apartment-details-page"}>
        <ApartmentDetails apartment={currentApartment}/>
    </MinimalLayout>
}
