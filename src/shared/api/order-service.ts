import {CreateOrderDto} from "./create-order.dto";
import {serverConnection} from "./server-connection.mocked";
import {Pagination} from "./types/pagination";
import {Order} from "./types/order";

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
}

export const orderService = new OrderService();