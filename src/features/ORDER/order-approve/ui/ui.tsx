import "./styles.scss";
import { UUID } from "../../../../shared/api/types/uuid";
import { orderService } from "../../../../shared/api/order-service";
import { Order } from "../../../../shared/api/types/order";
import { confirmModalStore } from "../../../../shared/ui/confirm-modal/confirm-modal-store";
import { ConfirmModalOptions } from "../../../../shared/api/types/confirm-modal-options";
import { useTypedTranslation } from "../../../../app/i18n/use-typed-translation";
import { AdminButton } from "../../../../shared/ui/admin-button";
import { ordersListStore } from "../../../../widgets/orders-list/model/orders-list-store";

type PropsType = {
   order: Order;
};

export function ApproveOrderButton({ order }: PropsType) {
   const { t } = useTypedTranslation();

   async function approveOrder(orderId: UUID) {
      try {
         await orderService.approveOrder(orderId);
         ordersListStore.dangerouslyReplaceOrder(orderId, {
            ...order,
            status: "APPROVED",
         }); //! Multiple truths
      } catch (err) {
         console.log(err);
      }
   }

   const modalOptions: ConfirmModalOptions = {
      description: t("Approve Order"),
      confirmButtonText: t("Approve"),
   };

   return (
      <AdminButton
         className="order-approve"
         title={t("Approve")}
         onClick={() =>
            confirmModalStore
               .askForConfirm(modalOptions)
               .then(() => approveOrder(order.id))
               .catch(err => {})
         }
      />
   );
}
