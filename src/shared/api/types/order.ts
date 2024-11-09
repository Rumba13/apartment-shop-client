import {UUID} from "./uuid";
import {OrderStatus} from "./order-status";
import {Price} from "./price";

export type Order = {
    id: UUID,
    apartmentId: UUID,
    fromDate: string,
    toDate: string,
    guestsQuantity: number, //rename to guestsCount
    phoneNumber: string,
    username: string,
    comment: string,
    totalPrice: Price,
    status: OrderStatus
}