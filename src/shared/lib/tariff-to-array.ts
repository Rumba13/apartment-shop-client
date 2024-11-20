import { Tariff } from "../api/types/tariff";

export function tariffToArray(tariff: Tariff) {
   return [tariff.mondayPrice, tariff.tuesdayPrice, tariff.wednesdayPrice, tariff.thursdayPrice, tariff.fridayPrice, tariff.saturdayPrice, tariff.sundayPrice];
}
