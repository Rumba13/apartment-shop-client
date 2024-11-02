import {action, makeObservable, observable, runInAction} from "mobx";
import React from "react";

export class PopUpStore {
    private _setIsOpened = (isOpened: boolean) => {
        runInAction(() => this.isOpened = isOpened)
    }

    constructor() {
        makeObservable(this, {
            isOpened: observable,
            setIsOpened: action,
        });

    }

    public isOpened: boolean = false;
    public setIsOpened = (isOpened: boolean) => {
        setTimeout(() => this._setIsOpened(isOpened), 0);
    }

    public stopPropagationInModal = (event: React.MouseEvent) => {
        this.isOpened && event.stopPropagation();
    }
}