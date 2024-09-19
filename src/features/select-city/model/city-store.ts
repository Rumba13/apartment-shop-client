import {makeAutoObservable} from "mobx";
import {City} from "../../../shared/api/types/city";

export class CityStore {
    constructor() {
        makeAutoObservable(this);
    }

    public city: City = "Gomel";

    public setCity(city: City){
        this.city = city;
    }
}