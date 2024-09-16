import "./styles.scss";
import { Route, Routes as ReactRoutes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import {HomePage} from "../../home-page";
import {ApartmentsPage} from "../../apartments-page";

export function Routes(){
    return (
        <BrowserRouter>
            <ReactRoutes>
                <Route path="/" element={<HomePage/>} />
                <Route path="/apartments" element={<ApartmentsPage/>} />
            </ReactRoutes>
        </BrowserRouter>
    )
}