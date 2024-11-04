import {ModalStore} from "../modal-store";
import {makeObservable, override, reaction, runInAction} from "mobx";
import {ConfirmModalOptions} from "../../api/types/confirm-modal-options";

class ConfirmModalStore extends ModalStore {

    constructor() {
        super();

        makeObservable(this, {
            isOpened: override,
            setIsOpened: override,
        })
    }

    private _currentModalPromise: Promise<void> | null = null;
    private _resolveModalPromise: () => void = () => {
    }
    private _rejectModalPromise: () => void = () => {
    }

    public confirm = () => {
        this._resolveModalPromise()
        this.close()
    };
    public cancel = () => {
        this._rejectModalPromise()
        this.close()
    };
    public modalOptions: ConfirmModalOptions = {description: ""}

    public askForConfirm(modalOptions: ConfirmModalOptions): Promise<void> {
        this.open()
        runInAction(() => this.modalOptions = modalOptions)

        this._currentModalPromise = new Promise<void>((innerResolve, innerReject) => {
            this._resolveModalPromise = innerResolve
            this._rejectModalPromise = innerReject;
        });

        //On modal close cancel the promise
        reaction(() => this.isOpened, (isOpened) => !isOpened && this.cancel());

        return this._currentModalPromise;
    }

}

export const confirmModalStore = new ConfirmModalStore();