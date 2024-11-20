import { Currency } from "./currency";
import { UUID } from "./uuid";

export type Tariff = {
   id: UUID;
   title: string;
   currency: Currency;
   mondayPrice: number;
   tuesdayPrice: number;
   wednesdayPrice: number;
   thursdayPrice: number;
   fridayPrice: number;
   saturdayPrice: number;
   sundayPrice: number;
};
