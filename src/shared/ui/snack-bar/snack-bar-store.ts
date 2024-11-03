import {makeAutoObservable} from "mobx";
import MarkIcon from "../../../assets/images/check.svg"
import {CSSProperties} from "react";

type ShowSnackBarConfig = {
    timeout?: number;
    icon?:any
    style?:CSSProperties
}

class SnackBarStore {
    constructor() {
        makeAutoObservable(this)
    }

    private previousTimerId: ReturnType<typeof setTimeout> | null = null;
    public isOpened: boolean = false;
    public setIsOpened = (isOpened: boolean) => this.isOpened = isOpened
    public isAnimatingOpening: boolean = false;
    public setIsAnimatingOpening = (isAnimatingOpening: boolean) => this.isAnimatingOpening = isAnimatingOpening
    public title: string = "";
    public setTitle = (title: string) => this.title = title
    public icon: any;
    public setIcon = (value: string) => this.icon = value
    public style: CSSProperties = {};
    public setStyle = (value: CSSProperties) => this.style = value

    public showSnackBar = (title: string, config?: ShowSnackBarConfig) => {
        this.setTitle(title);
        this.setIcon(config?.icon || MarkIcon);
        this.setStyle(config?.style || {});

        if (this.isOpened || this.isAnimatingOpening) {
            this.previousTimerId && clearTimeout(this.previousTimerId);
        } else {
            this.setIsAnimatingOpening(true);
            this.setIsOpened(true)
        }

        this.previousTimerId = setTimeout(() => this.setIsAnimatingOpening(false), config?.timeout || 3000);
    }
}

export const snackBarStore = new SnackBarStore()