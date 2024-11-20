import "./styles.scss";
import { redirect, useLocation, useParams } from "react-router-dom";
import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { CreateOrderForm } from "../../../features/ORDER/create-order-form";
import { MinimalLayout } from "../../../widgets/layouts/minimal-layout";

export const OrderPage = observer(() => {
   const { apartmentId } = useParams();
   const { pathname } = useLocation();

   useEffect(() => {
      window.scrollTo(0, 0);
   }, [pathname]);

   if (!apartmentId) {
      redirect("/");
      return <></>;
   }

   return (
      <MinimalLayout className="order-page">
         <h2 className="page__title">Создание заявки на бронь</h2>

         <div className="order-main">
            <CreateOrderForm apartmentId={apartmentId} />
         </div>
      </MinimalLayout>
   );
});
