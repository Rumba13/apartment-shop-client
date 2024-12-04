import "./styles.scss";
import { Route, Routes as ReactRoutes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { HomePage } from "../../home-page";
import { CreateApartmentPage } from "../../create-apartment-page";
import { ApartmentDetailsPage } from "../../apartment-details-page";
import { UpdateApartmentPage } from "../../update-apartment-page";
import { OrdersPage } from "../../orders-page";
import React from "react";
import { TariffsPage } from "../../tariffs-page";
import { OrderPage } from "../../order-page";
import { CalendarPage } from "../../calendar-page";
import { FavoriteListPage } from "../../favorite-list-page";
import { ROUTES } from "../../../shared/lib/routes";

export function Routes() {
   return (
      <BrowserRouter>
         <ReactRoutes>
            <Route path={ROUTES.HOME_PAGE} element={<HomePage />} />
            <Route path={ROUTES.CREATE_APARTMENT_PAGE} element={<CreateApartmentPage />} />
            <Route path={ROUTES.APARTMENT_DETAILS + "/:apartmentId"} element={<ApartmentDetailsPage />} />
            <Route path={ROUTES.UPDATE_APARTMENT_PAGE + "/:apartmentId"} element={<UpdateApartmentPage />} />
            <Route path={ROUTES.ORDERS_PAGE} element={<OrdersPage />} />
            <Route path={ROUTES.TARIFFS_PAGE + "/:tariffId?"} element={<TariffsPage />} />
            <Route path={ROUTES.ORDER_APARTMENT_PAGE + "/:apartmentId?"} element={<OrderPage />} />
            <Route path={ROUTES.CALENDAR_PAGE + "/:apartmentId?"} element={<CalendarPage />} />
            <Route path={ROUTES.FAVORITES_PAGE} element={<FavoriteListPage />} />
            <Route path="*"  element={<div>404</div>} />
         </ReactRoutes>
      </BrowserRouter>
   );
}
