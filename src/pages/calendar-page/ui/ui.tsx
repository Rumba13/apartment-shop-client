import "./styles.scss";
import {MinimalLayout} from "../../minimal-layout";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {ApartmentCalendar} from "../../../entities/calendar";

export function CalendarPage() {
    const {apartmentId} = useParams()
    const navigate = useNavigate();

    if (!apartmentId) {
        navigate("/", {relative: "route"})
        return <></>
    }

    return <MinimalLayout className="calendar-page">
        <ApartmentCalendar apartmentId={apartmentId}/>
    </MinimalLayout>
}