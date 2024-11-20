import "./styles.scss";
import { formatPrice } from "../../../../../shared/lib/format-price";
import React from "react";
import { Price } from "../../../../../shared/api/types/price";

type PropsType = {
   asideImage: any;
   asideTitle: string;
   asidePrice: Price;
};

export function CreateOrderAside({ asideImage, asidePrice, asideTitle }: PropsType) {
   return (
      <div className="create-order-form-aside order-article">
         <div className="aside-apartment-details">
            <img className="aside-apartment-details__image" src={asideImage} alt="" />

            <div className="description-container">
               <h2 className="aside-apartment-details__title">{asideTitle}</h2>
               <h2 className="aside-apartment-details__sub-title">ЧУП "Элит Тауэр"</h2>
            </div>
         </div>
         <div className="details-price">
            <span className="details-price__title article-title">Итого:</span>
            <div className="spring"></div>
            <span className="details-price__price article-title">от {formatPrice(asidePrice)}</span>
         </div>
         <button type="submit" className="submit-button">
            Отправить заявку
         </button>
      </div>
   );
}
