import {makeAutoObservable} from "mobx";

export class SelectStore {
    constructor() {
        makeAutoObservable(this);
    }
    public selectedValue:string | null = null;

    public setSelectedValue(value: string | null)
    {
        this.selectedValue = value;
    }
}