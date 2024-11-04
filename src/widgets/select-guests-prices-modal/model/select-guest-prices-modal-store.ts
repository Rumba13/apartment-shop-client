import {ModalStore} from "../../../shared/ui/modal-store";

export const selectGuestPricesModalStore = new ModalStore(document.querySelector(".order-modal") as HTMLElement);