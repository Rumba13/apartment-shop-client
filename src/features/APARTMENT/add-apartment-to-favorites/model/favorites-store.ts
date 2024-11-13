import {makeAutoObservable} from "mobx";
import {UUID} from "../../../../shared/api/types/uuid";

class FavoritesStore {
    constructor() {
        makeAutoObservable(this);
    }

    private readonly localStorageKey = "favorite-list";

    public favorites: UUID[] = []
    private setFavorites = (favorites: UUID[]) => this.favorites = favorites

    private addApartmentToFavorites(apartmentId: UUID) {
        this.favorites = [...this.favorites, apartmentId]
        this.writeFavoriteListToLocalStorage()
    }

    private removeApartmentFromFavorites(apartmentId: UUID) {
        const index = this.favorites.findIndex(id => apartmentId === id);
        this.favorites.splice(index, 1);
        this.favorites = [...this.favorites];
        this.writeFavoriteListToLocalStorage()
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
    public loadFavoriteListFromLocalStorage(): void {
        const favoriteList = localStorage.getItem(this.localStorageKey);

        if (favoriteList) {
            this.setFavorites(favoriteList.split(', '))
        }
    }

    public writeFavoriteListToLocalStorage(): void {
        localStorage.setItem(this.localStorageKey, this.favorites.join(', '));
    }
}

export const favoritesStore = new FavoritesStore();