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

type PropsType = {
    onChange?: (value: Currency) => void,
}

export const SelectCurrencyDropdown = observer(({onChange}:PropsType) => {
    return <Select className="select-currency-dropdown-wrapper"
                   variant="borderless"
                   value={currencyStore.currency}
                   onChange={currency => {
                       currencyStore.setCurrency(currency)
                       onChange?.(currency)
                   }}
                   options={options}
                   dropdownStyle={{zIndex: 200000}}
    />
});
