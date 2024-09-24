import "./styles.scss"
import {Link} from "react-router-dom";
import {StandartLayout} from "../../standart-layout";
import {ApartmentList} from "../../../widgets/apartment-list";
import {SortBy} from "../../../features/sort-by";

export function HomePage() {
    return <StandartLayout className="home-page">
        <div className="temp-div">
            <Link to={"/apartments"}>View apartments</Link>
            <SortBy/>
        </div>
        <ApartmentList/>
    </StandartLayout>
}