import './styles.scss';
import {Currency} from "../../../shared/api/types/currency";
import {Select} from "../../../shared/ui/select";
import {useState} from "react";
import {CurrencyStore} from "../model/currency-store";
import {observer} from "mobx-react";

type SelectOption = {
    value: Currency,
    label: string
}

export const SelectCurrencyDropdown = observer(() => {
    const [currencyStore] = useState(new CurrencyStore())
    const selectOptions: SelectOption[] = (["BYN", "USD", "EUR"] as Currency[]).map((currency): SelectOption => ({
        label: currency,
        value: currency
    }))

    return <Select className={"select-currency-dropdown"} options={selectOptions} value={currencyStore.currency}
                   onValueChanged={(value) => currencyStore.setCurrency(value as Currency)}/>
});
