import "./styles.scss";
import {observer} from "mobx-react";
import {SelectCityBigDropdown} from "../../../features/select-city";
import {ApartmentTypeRadioButtons} from "../../../features/select-apartment-type";
import {SelectGuestsCountInputNumber} from "../../../features/select-guests-count";
import {SearchButton} from "./search-button";

type PropsType = {

}

export const Search = observer(({}:PropsType) => {
    return (
        <div className={"search"}>
            <SelectCityBigDropdown/>
            <ApartmentTypeRadioButtons/>
            <SelectGuestsCountInputNumber/>
            <SearchButton/>
        </div>
    )
})