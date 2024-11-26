import "./styles.scss";
import { useEffect, useState } from "react";
import { Apartment } from "../../../shared/api/types/apartment";
import { Skeleton } from "antd";
import { apartmentService } from "../../../shared/api/apartment-service";
import { currencyStore } from "../../../features/select-currency";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import { AddApartmentToFavorites } from "../../../features/APARTMENT/add-apartment-to-favorites";

type PropsType = {
   apartmentId: string;
};
//TODO Legacy, remove
export const FavoriteApartmentCard = observer(({ apartmentId }: PropsType) => {
   const [apartment, setApartment] = useState<Apartment | null>(null);

   useEffect(() => {
      apartmentService.getApartmentById(apartmentId, currencyStore.currency).then(setApartment);
   }, [apartmentId, currencyStore.currency]);

   useEffect(() => {}, []);

   if (!apartment)
      return (
         <div className="favorite-apartment-card">
            <Skeleton />
         </div>
      );

   return (
      <div className="favorite-apartment-card">
         <AddApartmentToFavorites apartmentId={apartmentId} variant="mini" />
         <Link className="apartment-title" to={`/apartment-details/${apartmentId}`}>
            {apartment.title}
         </Link>
         {apartment.address}
      </div>
   );
});
