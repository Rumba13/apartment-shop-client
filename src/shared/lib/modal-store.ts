import {makeAutoObservable} from "mobx";
import {overlayStore} from "../../app/overlay";
import React from "react";

export class ModalStore {
    private _setIsOpened = (isOpened: boolean) => {
        this.isOpened = isOpened
        overlayStore.setIsOverlayOpened(isOpened)
    }

    constructor() {
        makeAutoObservable(this);
        document.addEventListener("click", () => this._setIsOpened(false))
    }

    public isOpened: boolean = false;
    public setIsOpened = (isOpened: boolean) => {
        setTimeout(() => this._setIsOpened(isOpened), 0);
    }

    public stopPropagationInModal = (event: React.MouseEvent) => {
        this.isOpened && event.stopPropagation();
    }
}