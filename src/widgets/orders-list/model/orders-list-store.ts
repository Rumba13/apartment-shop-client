import {makeAutoObservable} from "mobx";
import {Order} from "../../../shared/api/types/order";
import {orderService} from "../../../shared/api/order-service";
import {UUID} from "../../../shared/api/types/uuid";

class OrdersListStore {
    constructor() {
        makeAutoObservable(this)
    }

    public isLoading: boolean = false;
    public setIsLoading = (isLoading: boolean) => this.isLoading = isLoading;
    public isError: boolean = false;
    public setIsError = (isError: boolean) => this.isError = isError;
    public orders: Order[] = [];
    public setOrders = (orders: Order[]) => this.orders = orders;

    public async loadOrders() {
        this.setIsLoading(true);

        try {
            const orders = await orderService.getAllOrders()
            this.setOrders(orders.content)
        } catch (err) {
            console.log(err)
            this.setIsError(true)
        } finally {
            this.setIsLoading(false);
        }
    }

    public dangerouslyReplaceOrder(orderId: UUID, order: Order) {
        const newOrders = [];

        for (let i = 0; i < this.orders.length; i++) {
            const currentOrder = this.orders[i];

            if (currentOrder.id === orderId) {
                newOrders[i] = order;
            } else {
                newOrders[i] = currentOrder;
            }
        }

        this.setOrders(newOrders);
    }
}

export const ordersListStore = new OrdersListStore()