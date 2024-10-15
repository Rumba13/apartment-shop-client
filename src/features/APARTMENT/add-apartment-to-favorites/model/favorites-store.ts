import {makeAutoObservable} from "mobx";
import {UUID} from "../../../../shared/api/types/uuid";

class FavoritesStore {
    constructor() {
        makeAutoObservable(this);
    }

    private favorites: UUID[] = []

    private addApartmentToFavorites(apartmentId: UUID) {
        this.favorites = [...this.favorites, apartmentId]
    }

    private removeApartmentFromFavorites(apartmentId: UUID) {
        const index = this.favorites.findIndex(id => apartmentId === id);
        this.favorites.splice(index, 1);
        this.favorites = [...this.favorites];
    }


    public get favoritesCount() {
        return this.favorites.length;
    }

    public toggleApartmentInFavorites = (apartmentId: UUID) => {
        if (this.favorites.includes(apartmentId)) {
            this.removeApartmentFromFavorites(apartmentId);
        } else {
            this.addApartmentToFavorites(apartmentId);
        }
    }
}

export const favoritesStore = new FavoritesStore();