import {OrderStatus} from "../../../shared/api/types/order-status";
import {t} from "i18next";

export const orderStatusToOrderStatusTitle: { [key in OrderStatus]: string } = {
    APPROVED: t("Order Approved"),
    PENDING: t("Order Pending"),
    REJECTED: t("Order Rejected")
}