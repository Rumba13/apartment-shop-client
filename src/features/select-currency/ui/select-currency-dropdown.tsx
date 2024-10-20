import './styles.scss';
import {Currency} from "../../../shared/api/types/currency";
import {currencyStore} from "../model/currency-store";
import {observer} from "mobx-react";
import {Select} from "antd";

type SelectOption = {
    value: Currency,
    label: string
}

const options: SelectOption[] = (["BYN", "USD", "RUB"] as Currency[]).map((currency): SelectOption => ({
    label: currency,
    value: currency
}))

export const SelectCurrencyDropdown = observer(() => {
    return <Select className="select-currency-dropdown-wrapper"
                   defaultValue={options[0].value}
                   onChange={currency => currencyStore.setCurrency(currency)}
                   options={options}/>

});
