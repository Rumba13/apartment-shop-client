import {ModalStore} from "../../../shared/lib/modal-store";
import {action, makeObservable, observable, override} from "mobx";


class AuthModalStore extends ModalStore {
    constructor() {
        super()
        makeObservable(this, {
            isOpened: override,
            setIsOpened: override,
            activeTab: observable,
            setActiveTab: action
        })
    }

    public activeTab: number = 0;
    public setActiveTab = (activeTab: number) => this.activeTab = activeTab;

    public open = (activeTab: number) => {
        this.setActiveTab(activeTab);
        this.setIsOpened(true);
    }
}

export const authModalStore = new AuthModalStore()
