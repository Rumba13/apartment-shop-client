import {ModalStore} from "../../../shared/ui/modal-store";

export const selectGuestModalStore = new ModalStore(document.querySelector(".order-modal") as HTMLElement);