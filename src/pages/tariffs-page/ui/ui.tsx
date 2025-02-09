import "./styles.scss";
import { observer } from "mobx-react";
import { useParams } from "react-router-dom";
import { TariffList } from "../../../widgets/tariffs-list";
import { TariffDetails } from "../../../entities/tariff-details";
import { Button } from "../../../shared/ui/button";
import PlusIcon from "../../../assets/images/plus.svg";
import RefreshIcon from "../../../assets/images/refresh.svg";
import { CreateTariffModal, tariffModalStore } from "../../../widgets/create-tariff-modal";
import { UpdateTariffModal, updateTariffModalStore } from "../../../widgets/update-tariff-modal";
import { MinimalLayout } from "../../../widgets/layouts/minimal-layout";
import { tariffDetailsStore } from "../../../entities/tariff-details/model/tariff-details-store";

type TariffActionsPropsType = {
   tariffId: string | undefined
}

const TariffActions = ({ tariffId }: TariffActionsPropsType) => (
   <div className="tariff-actions">
      <Button
         title="Создать тариф"
         icon={PlusIcon}
         onClick={() => tariffModalStore.setIsOpened(true)}
      />
      {tariffId && (
         <Button
            title="Обновить тариф"
            icon={RefreshIcon}
            onClick={() => updateTariffModalStore.setIsOpened(true)}
         />
      )}
   </div>
);

export const TariffsPage = observer(() => {
   const { tariffId } = useParams();

   return (
      <MinimalLayout className="tariffs-page">
         <CreateTariffModal />
         <UpdateTariffModal tariff={tariffDetailsStore.tariff} />

         <TariffActions tariffId={tariffId} />

         <div className="wrapper">
            <TariffList currentTariffId={tariffId} />
            <TariffDetails id={tariffId} />
         </div>
      </MinimalLayout>
   );
});
