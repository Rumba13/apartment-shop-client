import "./styles.scss";
import {observer} from "mobx-react";
import {SelectCityBigDropdown} from "../../../features/select-city";
import {SelectGuestsCountInputNumber} from "../../../features/select-guests-count";
import {ApartmentDateFilter} from "../../../features/FILTER/filter-by-date";
import {SearchButton} from "./search-button";

type PropsType = {

}

export const Search = observer(({}:PropsType) => {

    return (
        <div className={"search"}>
            {/*<SelectCityBigDropdown/>*/}
            {/*<ApartmentDateFilter/>*/}
            <SelectGuestsCountInputNumber/>
            <SearchButton/>
        </div>
    )
})