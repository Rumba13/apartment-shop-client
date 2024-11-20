import { UUID } from "./uuid";
import { Currency } from "./currency";

export type CalendarDate = {
   id: UUID;
   date: string;
   price: number;
   isBooked: boolean;
   booking: {
      username: string;
      phoneNumber: string;
      totalPrice: number;
      currency: Currency;
   };
};
