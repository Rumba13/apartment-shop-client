import './styles.scss';
import {SvgIcon} from "../../../../../shared/ui/svg-icon";
import HeartIcon from "../../../../../assets/images/heart.svg"
import {favoritesStore} from "../../model/favorites-store";
import {Link} from "react-router-dom";
import {observer} from "mobx-react";


export const FavoritesCount = observer(() => {
    return <Link className="open-favorites-button" to="/wish-list">
        <span className="open-favorites-button__count">{favoritesStore.favoritesCount}</span>
        <SvgIcon icon={HeartIcon} className="heart-icon"/>
    </Link>
})
