import './styles.scss';
import {SvgIcon} from "../../../shared/ui/svg-icon";
import HeartIcon from "../../../assets/images/heart.svg"
import {wishListStore} from "../model/wish-list-store";
import {Link} from "react-router-dom";
import {observer} from "mobx-react";


export const OpenWishListButton = observer(() => {
    return <Link className="open-wish-list-button" to="/wish-list">
        <span className="open-wish-list-button__wishes-count">{wishListStore.wishesCount}</span>
        <SvgIcon icon={HeartIcon} className="heart-icon"/>
    </Link>
})
