import {CreateOrderDto} from "./types/create-order.dto";
import {serverConnection} from "./server-connection";
import {Pagination} from "./types/pagination";
import {Order} from "./types/order";
import {UUID} from "./types/uuid";
import {UpdateApartmentPriceDto} from "./types/update-apartment-price.dto";
import {Price} from "./types/price";

class OrderService {
    constructor() {
    }

    public async createOrder(createOrderDto: CreateOrderDto) {
        return (await serverConnection.post("/bookings", createOrderDto, {})).data;
    }

    public async getAllOrders(): Promise<Pagination<Order>> {
        return (await serverConnection.get("/bookings", {
            params: {
                page: 1,
                pageSize: 10
            }
        })).data;
    }

    public async approveOrder(orderId: UUID) {
        return (await serverConnection.patch(`/bookings/${orderId}/approve`)).data
    }

    public async rejectOrder(orderId: UUID) {
        return (await serverConnection.patch(`/bookings/${orderId}/reject`)).data
    }

    public async calculateOrderPrice({toDate, fromDate, guestsCount, apartmentId}: UpdateApartmentPriceDto):Promise<Price> {
        return (await serverConnection.get("/bookings/count-total-price", {
            params: {
                apartmentId,
                guestsQuantity: guestsCount,
                fromDate,
                toDate,
                resultCurrency: "USD" //TODO add result-currency
            }
        })).data

    }
}

export const orderService = new OrderService();