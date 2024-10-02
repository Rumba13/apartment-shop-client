import {makeAutoObservable} from "mobx";
import {UUID} from "../../../shared/api/types/uuid";

class WishListStore {
    constructor() {
        makeAutoObservable(this);
    }

    private addApartmentToWishList(apartmentId: UUID) {
        this.wishes = [...this.wishes, apartmentId]
    }
    private removeApartmentFromWishList(apartmentId: UUID) {
        const wishIndex = this.wishes.findIndex(id => apartmentId === id);
        this.wishes.splice(wishIndex, 1);
        this.wishes = [...this.wishes];
    }

    private wishes: UUID[] = []

    public get wishesCount() {
        return this.wishes.length;
    }

    public toggleApartmentWishList = (apartmentId: UUID) => {
        if (this.wishes.includes(apartmentId)) {
            this.removeApartmentFromWishList(apartmentId);
        } else {
            this.addApartmentToWishList(apartmentId);
        }
    }
}

export const wishListStore = new WishListStore();