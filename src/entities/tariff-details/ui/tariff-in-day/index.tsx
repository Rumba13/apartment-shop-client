import "./styles.scss";
import { Price } from "../../../../shared/api/types/price";
import { formatPrice } from "../../../../shared/lib/format-price";

type PropsType = {
   title: string;
   price: Price;
};

export function TariffInDay({ price, title }: PropsType) {
   return (
      <div className="tariff-in-day">
         <h2 className="tariff-in-day__title">{title}</h2>
         <h3 className="tariff-in-day__sub-title">{formatPrice(price)}</h3>
      </div>
   );
}
