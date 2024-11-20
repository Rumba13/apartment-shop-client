import { UUID } from "../../../../shared/api/types/uuid";
import { orderPriceStore } from "../../get-order-price";
import { currencyStore } from "../../../select-currency";
import dayjs, { Dayjs } from "dayjs";
import { GuestsCountByCategory } from "../../../../shared/api/types/guests-count-by-category";

const todayDate = dayjs();
const tomorrowDate = todayDate.add(1, "day");

export const updateOrderPrice = (apartmentId: UUID, guestsCountByCategory: GuestsCountByCategory, dates: (Dayjs | null)[]) => {
   const formattedDates = [(dates[0] || todayDate).format("YYYY-MM-DD"), (dates[1] || tomorrowDate).format("YYYY-MM-DD")];

   orderPriceStore.setGuestCountByCategory(guestsCountByCategory);
   orderPriceStore.setBookDateRange(formattedDates);
   orderPriceStore.loadOrderPrice(apartmentId, currencyStore.currency);
};
