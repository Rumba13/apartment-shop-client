import "./styles.scss";
import {ApartmentList} from "../../../widgets/apartment-list";
import {StandartLayout} from "../../standart-layout";

export function ApartmentsPage() {
    return (
        <StandartLayout className="apartments-page">
            ApartmentsPage
            <ApartmentList/>
        </StandartLayout>
    )
}