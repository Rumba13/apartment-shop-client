import './styles.scss';
import {SvgIcon} from "../../../shared/ui/svg-icon";
import HeartIcon from "../../../assets/images/heart-regular.svg"
import {wishListStore} from "../model/wish-list-store";
import {Link} from "react-router-dom";


export function OpenWishListButton() {

    return <Link className="open-wish-list-button" to="/wish-list">
        <span className="open-wish-list-button__wishes-count">{wishListStore.wishesCount}</span>
        <SvgIcon icon={HeartIcon}/>
    </Link>
}
