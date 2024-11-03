import {UUID} from "../../../../shared/api/types/uuid";
import {orderService} from "../../../../shared/api/order-service";
import {ValuesType} from "../ui/ui";

export async function createOrder(values: ValuesType, apartmentId: UUID,) {
    await orderService.createOrder({
        apartmentId: apartmentId,
        comment: values.comment,
        fromDate: values.bookDateRange[0],
        toDate: values.bookDateRange[0],
        username: values.username,
        phoneNumber: values.phone,
        adultQuantity: values.adultCount,
        teenQuantity: values.teenCount,
        babyQuantity: values.babyCount,
        petQuantity: values.petCount,
        kidQuantity: values.kidCount
    })
}