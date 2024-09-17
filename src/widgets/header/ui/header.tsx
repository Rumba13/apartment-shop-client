import './styles.scss';
import {Logo} from "../../../entities/logo";
import {SelectCityDropdown} from "../../../features/select-city";
import {SelectCurrencyDropdown} from "../../../features/select-currency";
import {OpenWishListButton} from "../../../features/add-to-wishlist";

export function Header() {

    return <header className="header">
        <div className="header-top">
            <Logo/>
            <SelectCityDropdown/>
            <SelectCurrencyDropdown/>
            <OpenWishListButton/>
            <div className="open-user-menu"></div>
        </div>
    </header>
}
