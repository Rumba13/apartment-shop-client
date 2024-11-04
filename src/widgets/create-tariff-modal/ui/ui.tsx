import './styles.scss';
import {observer} from "mobx-react";
import {Modal} from "../../../shared/ui/modal";
import {tariffModalStore} from "../model/tariff-modal-store";
import {CreateTariffForm} from "../../../features/TARIFF/create-tariff";



export const CreateTariffModal = observer(() => {
    return <Modal title="Создать тариф"
                  modalStore={tariffModalStore}
    >
       <CreateTariffForm/>
    </Modal>
})
