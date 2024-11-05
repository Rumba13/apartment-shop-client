import {UUID} from "./uuid";

export type CalendarDate = {
    id:UUID,
    date:string,
    price:number,
    isBooked:boolean,
}