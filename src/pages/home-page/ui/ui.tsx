import {Link} from "react-router-dom";

export function HomePage(){
    return <div>
        Home page
        <Link to={"/apartments"}>View apartments</Link>
    </div>
}