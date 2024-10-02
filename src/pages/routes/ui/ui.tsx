import "./styles.scss";
import { Route, Routes as ReactRoutes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import {HomePage} from "../../home-page";
import {ApartmentsPage} from "../../apartments-page";
import {WishListPage} from "../../wish-list-page";
import {CreateApartmentPage} from "../../create-apartment-page";
import {ApartmentDetailsPage} from "../../apartment-details-page";

export function Routes(){
    return (
        <BrowserRouter>
            <ReactRoutes>
                <Route path="/" element={<HomePage/>} />
                <Route path="/apartments" element={<ApartmentsPage/>} />
                <Route path="/wish-list" element={<WishListPage/>} />
                <Route path="/create-apartment" element={<CreateApartmentPage/>} />
                <Route path="/apartment-details/:apartmentId" element={<ApartmentDetailsPage/>}  />
                <Route path="*" element={<div>404</div>}  />
            </ReactRoutes>
        </BrowserRouter>
    )
}