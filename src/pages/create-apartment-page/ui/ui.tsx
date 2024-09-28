import "./styles.scss";
import {StandartLayout} from "../../standart-layout";
import {CreateApartmentForm} from "../../../features/create-apartment";

export function CreateApartmentPage() {
    return <StandartLayout className="create-apartment-page" noAside>
        <CreateApartmentForm/>
    </StandartLayout>
}
