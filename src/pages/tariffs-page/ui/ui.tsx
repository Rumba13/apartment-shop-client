import "./styles.scss";
import {MinimalLayout} from "../../minimal-layout";
import {observer} from "mobx-react";
import {userStore} from "../../../entities/user";
import {useNavigate, useParams} from "react-router-dom";
import {AppLoader} from "../../../entities/app-loader";
import {TariffList} from "../../../widgets/tariffs-list";
import {TariffDetails} from "../../../entities/tariff-details";

export const TariffsPage = observer(() => {
    const navigate = useNavigate()
    const {tariffId} = useParams()

    if (userStore.isLoading) return <AppLoader/>

    if (!userStore.user?.isSuperuser) {
        navigate("/")
        return <></>
    }

    return (
        <MinimalLayout className="tariffs-page">
            <TariffList/>
            <TariffDetails id={tariffId}/>
        </MinimalLayout>
    )
});