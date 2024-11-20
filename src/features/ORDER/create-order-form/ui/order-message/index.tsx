import "./styles.scss";
import WarnSignIcon from "../../../../../assets/images/warning-icon.svg";
import { SvgIcon } from "../../../../../shared/ui/svg-icon";

export function OrderMessage() {
   return (
      <div className="order-message order-article">
         <div className="order-message-container">
            <SvgIcon className="message-icon" icon={WarnSignIcon} />

            <div>
               <h2 className="message__title">Указывайте реальные данные</h2>
               <span className="message__description">Арендодатель вправе отказать в заселении или отменить заявку, если указанные данные неверны</span>
            </div>
         </div>
      </div>
   );
}
