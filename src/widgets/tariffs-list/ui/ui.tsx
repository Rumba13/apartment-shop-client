import "./styles.scss";
import { observer } from "mobx-react";
import { useEffect } from "react";
import { tariffsListStore } from "../model/tariffs-list-store";
import { AppLoader } from "../../../entities/app-loader";
import { TariffCard } from "../../../entities/tariff-card";
import { useNavigate } from "react-router-dom";
import { UUID } from "../../../shared/api/types/uuid";

type PropsType = {
   currentTariffId?: UUID;
};

export const TariffList = observer(({ currentTariffId }: PropsType) => {
   const navigate = useNavigate();

   useEffect(() => {
      tariffsListStore.loadTariffs();
   }, []);

   if (tariffsListStore.isLoading)
      return (
         <div className="tariff-list">
            <AppLoader />
         </div>
      );
   return (
      <div className="tariff-list">
         {tariffsListStore.tariffs?.map(tariff => (
            <TariffCard
               tariff={tariff}
               key={tariff.id}
               isActive={tariff.id === currentTariffId}
               onClick={() =>
                  navigate("/tariffs/" + tariff.id, {
                     relative: "route",
                     replace: true,
                  })
               }
            />
         ))}
      </div>
   );
});
