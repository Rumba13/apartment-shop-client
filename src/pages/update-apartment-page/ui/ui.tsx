import "./styles.scss";
import {StandartLayout} from "../../standart-layout";
import {userStore} from "../../../entities/user";
import {useNavigate, useParams} from "react-router-dom";
import {observer} from "mobx-react";
import {UpdateApartmentForm} from "../../../features/APARTMENT/update-apartment";
import {useEffect} from "react";
import {apartmentService} from "../../../shared/api/apartment-service";
import {currencyStore} from "../../../features/select-currency";

export const UpdateApartmentPage = observer(() => {
    const navigate = useNavigate()
    const {apartmentId} = useParams()

    if (!userStore.user?.isSuperuser || !apartmentId) {
        navigate("/");
        return <></>
    }



    return <StandartLayout className="update-apartment-page" noAside>
        <UpdateApartmentForm apartmentId={apartmentId}/>
    </StandartLayout>
});
