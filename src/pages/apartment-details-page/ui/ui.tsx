import './styles.scss';
import {redirect, useParams} from "react-router-dom";
import {MinimalLayout} from "../../minimal-layout";
import {ApartmentDetails} from "../../../entities/apartment-details";

export function ApartmentDetailsPage() {
    const {apartmentId} = useParams()

    if (!apartmentId) {
         redirect("/");
         return <></>;
    }

    return <MinimalLayout className={"apartment-details-page"}>
        <ApartmentDetails apartmentId={apartmentId}/>
    </MinimalLayout>
}
