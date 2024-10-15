import {makeAutoObservable} from "mobx";
import {Order} from "../../../shared/api/types/order";
import {orderService} from "../../../shared/api/order-service";

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
}

export const ordersListStore = new OrdersListStore()