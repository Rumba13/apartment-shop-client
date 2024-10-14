import {CreateOrderDto} from "./create-order.dto";
import {serverConnection} from "./server-connection.mocked";

class OrderService {
    constructor() {}

    public async createOrder(createOrderDto:CreateOrderDto)
    {
        return (await serverConnection.post("/orders", createOrderDto, {

        })).data;
    }

}
export const orderService = new OrderService();