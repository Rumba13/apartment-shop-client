import "./styles.scss"
import {StandartLayout} from "../../standart-layout";
import {ApartmentList} from "../../../widgets/apartment-list";
import {SortBy} from "../../../features/sort-by";
import {OpenCreateApartmentPageButton} from "./open-create-apartment-page-button";
import {userStore} from "../../../entities/user";
import {useEffect} from "react";
import {observer} from "mobx-react";

export const HomePage = observer(() => {
    useEffect(() => {
    }, [userStore.user]);

    return <StandartLayout className="home-page">
        <div className="temp-div">
            {userStore.user?.isSuperuser && <OpenCreateApartmentPageButton/>}
            <SortBy/>
        </div>
        <ApartmentList/>
    </StandartLayout>
});