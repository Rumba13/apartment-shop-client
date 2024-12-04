import { OrdersList } from "../../../widgets/orders-list";
import { observer } from "mobx-react";
import { MinimalLayout } from "../../../widgets/layouts/minimal-layout";

export const OrdersPage = observer(() => {
   return (
      <MinimalLayout className={"orders-page"}>
         <OrdersList />
      </MinimalLayout>
   );
});
