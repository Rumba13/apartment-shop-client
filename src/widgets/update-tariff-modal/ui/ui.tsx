import "./styles.scss";
import { observer } from "mobx-react";
import { Modal } from "../../../shared/ui/modal";
import { updateTariffModalStore } from "../model/update-tariff-modal-store";
import { UUID } from "../../../shared/api/types/uuid";
import { UpdateTariffForm } from "../../../features/TARIFF/update-tariff";
import { useTypedTranslation } from "../../../app/i18n/use-typed-translation";
import { tariffDetailsStore } from "../../../entities/tariff-details/model/tariff-details-store";

type PropsType = {
   tariffId: UUID;
};

export const UpdateTariffModal = observer(({ tariffId }: PropsType) => {
   const { t } = useTypedTranslation();

   return (
      <Modal title="Обновить тариф" modalStore={updateTariffModalStore}>
         {tariffDetailsStore.tariffDetails !== null && <UpdateTariffForm tariff={tariffDetailsStore.tariffDetails} />}
      </Modal>
   );
});
