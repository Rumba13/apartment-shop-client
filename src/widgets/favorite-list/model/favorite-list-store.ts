import {LoadingStore} from "../../../shared/model/loading-store";
import {action, makeObservable, observable, override} from "mobx";
import {Apartment} from "../../../shared/api/types/apartment";

class FavoriteListStore extends LoadingStore {
        constructor() {
            super();
            makeObservable(this, {
                isError:override,
                setIsLoading:override,
                setIsError:override,
                isLoading:override,
                favoriteApartments:observable,
                setFavoriteApartments:action
            })
        }

    public favoriteApartments:Apartment[] | null = null;
    public setFavoriteApartments = (apartment:Apartment[] | null) => this.favoriteApartments = apartment



}

export const favoriteListStore = new FavoriteListStore();