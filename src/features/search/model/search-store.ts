import {makeAutoObservable} from "mobx";
import {City} from "../../../shared/api/types/city";

class SearchStore {
    constructor() {
        makeAutoObservable(this);
    }
    public city:City | null = null;
}

export const searchStore = new SearchStore()