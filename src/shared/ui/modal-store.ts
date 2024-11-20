import { action, makeObservable, observable, runInAction } from "mobx";
import { overlayStore } from "../../app/overlay";
import React from "react";

export class ModalStore {
   private _setIsOpened = (isOpened: boolean) => {
      runInAction(() => (this.isOpened = isOpened));
      overlayStore.setIsOverlayOpened(isOpened);
   };

   constructor(parentModal?: HTMLElement) {
      makeObservable(this, {
         isOpened: observable,
         setIsOpened: action,
         close: action,
         open: action,
      });

      document.addEventListener("click", () => this._setIsOpened(false));
   }

   public isOpened: boolean = false;
   public setIsOpened = (isOpened: boolean) => {
      setTimeout(() => this._setIsOpened(isOpened), 0);
   };
   public close = () => this.setIsOpened(false);
   public open = () => this.setIsOpened(true);

   public stopPropagationInModal = (event: React.MouseEvent) => {
      this.isOpened && event.stopPropagation();
   };
}
