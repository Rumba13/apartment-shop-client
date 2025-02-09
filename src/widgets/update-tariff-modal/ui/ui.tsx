import "./styles.scss";
import { observer } from "mobx-react";
import { Modal } from "../../../shared/ui/modal";
import { updateTariffModalStore } from "../model/update-tariff-modal-store";
import { UpdateTariffForm } from "../../../features/TARIFF/update-tariff";
import { Tariff } from "../../../shared/api/types/tariff";

type PropsType = {
   tariff: Tariff | null
};

export const UpdateTariffModal = observer(({ tariff }: PropsType) => {
   return (
      <Modal title="Обновить тариф" modalStore={updateTariffModalStore}>
         {tariff && <UpdateTariffForm tariff={tariff} />}
      </Modal>
   );
});
