import "./styles.scss";
import { observer } from "mobx-react";
import { tariffDetailsStore } from "../model/tariff-details-store";
import { useEffect } from "react";
import { AppLoader } from "../../app-loader";
import { useTypedTranslation } from "../../../app/i18n/use-typed-translation";
import { UUID } from "../../../shared/api/types/uuid";
import { TariffInDay } from "./tariff-in-day";
import { mapDayIndexToDayOfWeek } from "../../../shared/lib/map-day-index-to-day-of-week";

type PropsType = {
   id?: UUID;
};

export const TariffDetails = observer(({ id }: PropsType) => {
   const { t } = useTypedTranslation();

   useEffect(() => {
      id && tariffDetailsStore.loadTariffDetails(id);
   }, [id]);

   useEffect(() => {}, [tariffDetailsStore.tariff]);

   if (!id) return <div className="tariff-details">{t("Choose tariff")}</div>;
   if (tariffDetailsStore.isLoading)
      return (
         <div className="tariff-details">
            <AppLoader />
         </div>
      );
   if (tariffDetailsStore.tariff === null) return <div className="tariff-details">{t("Nothing Found")}</div>;
   if (tariffDetailsStore.isError) return <div className="tariff-details">{t("Some error has occurred")}</div>;

   const { fridayPrice, mondayPrice, saturdayPrice, sundayPrice, wednesdayPrice, thursdayPrice, tuesdayPrice } = tariffDetailsStore.tariff;

   const tariffsOnWeek = [mondayPrice, tuesdayPrice, wednesdayPrice, fridayPrice, thursdayPrice, saturdayPrice, sundayPrice];

   return (
      <div className="tariff-details">
         {tariffsOnWeek.map((tariff, dayIndex) => (
            <TariffInDay
               title={t(mapDayIndexToDayOfWeek[dayIndex])}
               price={{
                  amount: tariff,
                  //@ts-ignore //TODO fix typescript types warning
                  currency: tariffDetailsStore.tariff.currency,
               }}
            />
         ))}
      </div>
   );
});
