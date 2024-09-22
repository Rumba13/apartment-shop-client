import {makeAutoObservable} from "mobx";

class WishListStore {
    constructor() {
        makeAutoObservable(this);
    }

    get wishesCount(){
        return 0;
    }
}

export const wishListStore = new WishListStore();