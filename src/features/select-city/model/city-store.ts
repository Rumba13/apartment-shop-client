import {makeAutoObservable} from "mobx";
import {City} from "../../../shared/api/types/city";

class CityStore {
    constructor() {
        makeAutoObservable(this);
    }

    public city: City = "Gomel";

    public setCity(city: City){
        this.city = city;
    }
}
export const cityStore= new CityStore()