import {Link} from "react-router-dom";
import {StandartLayout} from "../../standart-layout";
import {ApartmentList} from "../../../widgets/apartment-list";

export function HomePage(){
   return <StandartLayout className="home-page">
        <Link to={"/apartments"}>View apartments</Link>
       <ApartmentList/>
    </StandartLayout>
}