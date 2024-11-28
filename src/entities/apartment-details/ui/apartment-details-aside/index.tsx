import "./styles.scss";
import { TitleWithIcon } from "../../../../shared/ui/title-with-icon";
import GeoIcon from "../../../../assets/images/geo-location-colorfull.svg";
import { OrderMenuButton } from "../open-order-modal/ui";
import React, { MouseEventHandler } from "react";
import { Price } from "../../../../shared/api/types/price";
import { UUID } from "../../../../shared/api/types/uuid";
import { formatPriceMini } from "../../../../shared/lib/format-price";
import { useTranslation } from "react-i18next";

type PropsType = {
   title: string;
   address: string;
   price: Price;
   apartmentId: UUID;
   scrollToMap: MouseEventHandler<HTMLElement>;
};

export function ApartmentDetailsAside({ title, address, price, apartmentId, scrollToMap }: PropsType) {
   const { t } = useTranslation();

   return (
      <div className="apartment-details-aside">
         <h2 className="apartment-details-aside__title">{title}</h2>
         <span className="apartment-details-aside__address">{address}</span>
         <TitleWithIcon className="apartment-details-aside__on-map-link" icon={GeoIcon} onClick={scrollToMap}>
            На карте
         </TitleWithIcon>

         <div className="apartment-details-aside-prices">
            <div className="price-option">
               <span className="price">
                  {t("From")} <b>{formatPriceMini(price)}.</b> / {t("Day")}
               </span>
            </div>
         </div>
         <div className="price-chips">
            <div className="price-chip">
               {t("Day")}
               <span className="price-chip__price">{formatPriceMini(price)}.</span>
            </div>
         </div>

         <OrderMenuButton apartmentId={apartmentId} />
      </div>
   );
}
