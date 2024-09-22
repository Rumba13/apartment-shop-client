import {Link} from "react-router-dom";
import {Header} from "../../../widgets/header";

export function HomePage(){
    return <div>
        <Header/>
        Home page
        <Link to={"/apartments"}>View apartments</Link>
    </div>
}