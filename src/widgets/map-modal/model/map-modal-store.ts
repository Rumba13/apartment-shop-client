import { ModalStore } from "../../../shared/ui/modal-store";
import { action, makeObservable, observable, override } from "mobx";

class MapModalStore extends ModalStore {
   constructor() {
      super();
      makeObservable(this, {
         setIsOpened: override,
         isOpened: override,
         address: observable,
         setAddress: action,
      });
   }

   public address: string = "";
   public setAddress = (address: string) => (this.address = address);

   public showModal = (address: string) => {
      this.setAddress(address);
      this.open();
   };
}

export const mapModalStore = new MapModalStore();
