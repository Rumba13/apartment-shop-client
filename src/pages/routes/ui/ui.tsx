import "./styles.scss";
import {Route, Routes as ReactRoutes} from 'react-router';
import {BrowserRouter} from 'react-router-dom';
import {HomePage} from "../../home-page";
import {CreateApartmentPage} from "../../create-apartment-page";
import {ApartmentDetailsPage} from "../../apartment-details-page";
import {UpdateApartmentPage} from "../../update-apartment-page";
import {OrdersPage} from "../../orders-page";
import React from "react";
import {TariffsPage} from "../../tariffs-page";
import {CONSTANTS, SERVER_TYPE} from "../../../shared/lib/constants";
import {DevPage} from "../../dev-page";
import {OrderPage} from "../../order-page/ui/ui";

export function Routes() {

    return (
        <BrowserRouter>
            <ReactRoutes>
                <Route path="/" element={<HomePage/>}/>
                {/*<Route path="/wish-list" element={<WishListPage/>}/>*/}
                <Route path="/create-apartment" element={<CreateApartmentPage/>}/>
                <Route path="/apartment-details/:apartmentId" element={<ApartmentDetailsPage/>}/>
                <Route path="/update-apartment/:apartmentId" element={<UpdateApartmentPage/>}/>
                <Route path="/orders" element={<OrdersPage/>}/>
                <Route path="/tariffs/:tariffId?" element={<TariffsPage/>}/>
                {CONSTANTS.SERVER_TYPE === SERVER_TYPE.DEVELOPMENT &&  <Route path="/dev" element={<DevPage/>}/>}
                <Route path="/order/:apartmentId" element={<OrderPage/>}/>

                <Route path="/404" element={<div>404</div>}/>

            </ReactRoutes>
        </BrowserRouter>
    )
}