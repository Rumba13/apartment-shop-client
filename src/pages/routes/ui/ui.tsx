import "./styles.scss";
import { Route, Routes as ReactRoutes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import {HomePage} from "../../home-page";
import {ApartmentsPage} from "../../apartments-page";
import {WishListPage} from "../../wish-list-page";
import {CreateApartmentPage} from "../../create-apartment-page";

export function Routes(){
    return (
        <BrowserRouter>
            <ReactRoutes>
                <Route path="/" element={<HomePage/>} />
                <Route path="/apartments" element={<ApartmentsPage/>} />
                <Route path="/wish-list" element={<WishListPage/>} />
                <Route path="/create-apartment-page" element={<CreateApartmentPage/>} />
            </ReactRoutes>
        </BrowserRouter>
    )
}