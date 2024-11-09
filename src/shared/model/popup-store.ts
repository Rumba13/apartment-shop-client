import {action, makeObservable, observable, runInAction} from "mobx";
import React from "react";

export class PopupStore {

    private _setIsOpened = (isOpened: boolean) => {
        runInAction(() => this.isOpened = isOpened)
    }

    constructor() {
        makeObservable(this, {
            isOpened: observable,
            setIsOpened: action,
            close: action,
            open: action
        });

        document.addEventListener("click", () => this._setIsOpened(false))
    }

    public isOpened: boolean = false;
    public setIsOpened = (isOpened: boolean) => setTimeout(() => this._setIsOpened(isOpened), 0);
    public close = () => this.setIsOpened(false);
    public open = () => this.setIsOpened(true);

    public stopPropagationInPopup = (event: React.MouseEvent) => {
        this.isOpened && event.stopPropagation();
    }
}