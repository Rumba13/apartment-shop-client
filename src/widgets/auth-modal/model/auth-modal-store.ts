import { ModalStore } from "../../../shared/ui/modal-store";
import { action, makeObservable, observable, override } from "mobx";

class AuthModalStore extends ModalStore {
   constructor() {
      super();
      makeObservable(this, {
         isOpened: override,
         setIsOpened: override,
         activeTab: observable,
         setActiveTab: action,
         open: override,
         close: override,
      });
   }

   public activeTab: number = 0;
   public setActiveTab = (activeTab: number) => (this.activeTab = activeTab);

   public openWithTab = (activeTab: number) => {
      this.setActiveTab(activeTab);
      this.open();
   };
}

export const authModalStore = new AuthModalStore();
