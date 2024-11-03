import './styles.scss';
import {Modal} from "../../../shared/ui/modal";
import {observer} from "mobx-react";
import {welcomeModalStore} from "../model/welcome-modal-store";

export const WelcomeModal = observer(() => {

    return <Modal title={"WelcomeModal"}
                  isOpened={welcomeModalStore.isOpened}
                  stopPropagation={welcomeModalStore.stopPropagationInModal}
                  onCrossClick={() => welcomeModalStore.setIsOpened(false)}>
        WelcomeModalssss
    </Modal>
})
