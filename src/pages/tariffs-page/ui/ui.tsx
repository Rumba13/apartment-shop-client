import "./styles.scss";
import {MinimalLayout} from "../../minimal-layout";
import {observer} from "mobx-react";
import {userStore} from "../../../entities/user";
import {useNavigate, useParams} from "react-router-dom";
import {AppLoader} from "../../../entities/app-loader";
import {TariffList} from "../../../widgets/tariffs-list";
import {TariffDetails} from "../../../entities/tariff-details";
import {Button} from "../../../shared/ui/button";
import PlusIcon from "../../../assets/images/plus.svg"
import RefreshIcon from "../../../assets/images/refresh.svg"

import {CreateTariffModal, tariffModalStore} from "../../../widgets/create-tariff-modal";
import {UpdateTariffModal, updateTariffModalStore} from "../../../widgets/update-tariff-modal";

export const TariffsPage = observer(() => {
    const navigate = useNavigate()
    const {tariffId} = useParams()

    if (userStore.isLoading) return <AppLoader/>

    if (!userStore.user?.isSuperuser) {
        navigate("/")
        return <></>
    }

    console.log(tariffId)

    return (
        <MinimalLayout className="tariffs-page">
            <CreateTariffModal/>
            {tariffId && <UpdateTariffModal tariffId={tariffId}/>}

            <div className="tariff-actions">
                <Button title={"Создать тариф"}
                        icon={PlusIcon}
                        onClick={() => tariffModalStore.setIsOpened(true)}/>
                {tariffId && <Button title="Обновить тариф"
                                     icon={RefreshIcon}
                                     onClick={() => updateTariffModalStore.setIsOpened(true)}/>}
            </div>
            <div className="wrapper">
                <TariffList currentTariffId={tariffId}/>
                <TariffDetails id={tariffId}/>
            </div>
        </MinimalLayout>
    )
});