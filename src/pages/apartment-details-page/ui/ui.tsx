import './styles.scss';
import {redirect, useLocation, useParams} from "react-router-dom";
import {MinimalLayout} from "../../minimal-layout";
import {ApartmentDetails} from "../../../entities/apartment-details";
import React, {useEffect} from "react";

export function ApartmentDetailsPage() {
    const {apartmentId} = useParams()
    const {pathname} = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    if (!apartmentId) {
        redirect("/");
        return <></>;
    }

    return <MinimalLayout className={"apartment-details-page"}>
        <ApartmentDetails apartmentId={apartmentId}/>
    </MinimalLayout>
}
