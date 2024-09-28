import {makeAutoObservable} from "mobx";
import {Price} from "../../../shared/api/types/price";
import {Tag} from "../../../shared/api/types/tag";

class CreateApartmentStore {
    constructor() {
        makeAutoObservable(this);
    }

    public title: string = "";
    public description: string = "";
    public roomsQuantity: number = 1;
    public price: Price = {amount: 1, currency: "BYN"};
    public address: string = "";
    public areaInSquareMeters:number = 1;
    public tags:Tag[] = []
    public photos:string[] = []
}

export const createApartmentStore = new CreateApartmentStore()