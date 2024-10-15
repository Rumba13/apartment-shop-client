import {CreateOrderDto} from "./create-order.dto";
import {serverConnection} from "./server-connection";
import {Pagination} from "./types/pagination";
import {Order} from "./types/order";
import {UUID} from "./types/uuid";

class OrderService {
    constructor() {
    }

    public async createOrder(createOrderDto: CreateOrderDto) {
        return (await serverConnection.post("/orders", createOrderDto, {})).data;
    }

    public async getAllOrders(): Promise<Pagination<Order>> {
        return (await serverConnection.get("/orders", {
            params: {
                page: 1,
                pageSize: 10
            }
        })).data;
    }
    public async approveOrder(orderId:UUID) {
        return (await serverConnection.patch(`/orders/${orderId}/approve`)).data
    }
    public async rejectOrder(orderId:UUID) {
        return (await serverConnection.patch(`/orders/${orderId}/reject`)).data
    }
}

export const orderService = new OrderService();