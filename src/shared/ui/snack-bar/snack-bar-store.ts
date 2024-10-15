import {makeAutoObservable} from "mobx";

type ShowSnackBarConfig = {
    timeout?: number;
}

class SnackBarStore {
    constructor() {
        makeAutoObservable(this)
    }

    public isOpened: boolean = false;
    public setIsOpened = (isReallyOpened: boolean) => this.isOpened = isReallyOpened
    public isAnimatingOpening: boolean = false;
    public setIsAnimatingOpening = (isAnimatingOpening: boolean) => this.isAnimatingOpening = isAnimatingOpening
    public title: string = "";
    public setTitle = (title: string) => this.title = title

    public showSnackBar = (title: string, config?: ShowSnackBarConfig) => {
        this.setTitle(title);
        this.setIsAnimatingOpening(true);
        this.setIsOpened(true)
        setTimeout(() => this.setIsAnimatingOpening(false), config?.timeout || 3000);
    }
}

export const snackBarStore = new SnackBarStore()