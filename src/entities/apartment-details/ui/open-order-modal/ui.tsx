import "./styles.scss";
import { Button } from "../../../../shared/ui/button";
import OrderIcon from "../../../../assets/images/text-bubble.svg";
import { useTypedTranslation } from "../../../../app/i18n/use-typed-translation";
import { Link } from "react-router-dom";
import { UUID } from "../../../../shared/api/types/uuid";
import { ROUTES } from "../../../../shared/lib/routes";
import { useTranslation } from "react-i18next";

type PropsType = {
   apartmentId: UUID;
};

export function OrderMenuButton({ apartmentId }: PropsType) {
   const { t } = useTranslation();

   return (
      <Link to={`${ROUTES.ORDER_APARTMENT_PAGE}/${apartmentId}`}>
         <Button className="open-order-modal-button" icon={OrderIcon} onClick={() => {}} title={t("Leave Request")} />
      </Link>
   );
}
