import {makeAutoObservable} from "mobx";

class SearchStore {
    constructor() {
        makeAutoObservable(this);
    }
}

export const searchStore = new SearchStore()