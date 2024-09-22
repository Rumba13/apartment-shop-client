import './styles.scss';
import {useTypedTranslation} from "../../../app/i18n/use-typed-translation";
import {observer} from "mobx-react";
import {filterByPriceStore} from "../model/filter-by-price-store";
import {Slider} from "@mui/material";
import {currencyStore, currencyToPostfixMap} from "../../select-currency";
import {useEffect} from "react";
import RangeImage from "../../../assets/images/mocked/price-range.png"

export const FilterByPrice = observer(() => {
    const {t} = useTypedTranslation();

    //TODO add values validation

    useEffect(() => {

    }, [currencyStore.currency]);


    const setSliderValue = (value: number | number[], activeThumb: number) => {
        if (Array.isArray(value)) {
            filterByPriceStore.setMinPrice(value[0]);
            filterByPriceStore.setMaxPrice(value[1]);
        } else {
            if (activeThumb === 0) {
                filterByPriceStore.setMinPrice(value);
            } else {
                filterByPriceStore.setMaxPrice(value);
            }
        }
    }

    const getLabel = (value: number) => `${value || 0} ${currencyToPostfixMap[currencyStore.currency]}`

    //const validateValue = (value:number) => Math.min(filterByPriceStore.maxPriceBound, Math.max(filterByPriceStore.minPriceBound, value));

    return (
        <div className="filter-by-price">
            <span className="filter-by-price__title">{t("Price")}</span>
            <div className="filter-by-price-inputs">
                <div className="price-input _min">
                    <span className="price-input__title">{t("From")}</span>
                    <input type="number" className="price-input__input" value={filterByPriceStore.minPrice} max={"222"}
                           onChange={({target: {value}}) => filterByPriceStore.setMinPrice(parseInt(value))}/>
                </div>
                <div className="price-input _max">
                    <span className="price-input__title">{t("To")}</span>
                    <input type="number" className="price-input__input" value={filterByPriceStore.maxPrice}
                           onChange={({target: {value}}) => filterByPriceStore.setMaxPrice(parseInt(value))}/>
                </div>
            </div>

            <div className="slider-wrapper">
                <img className={"slider-wrapper__image"} src={RangeImage} alt=''/>
                <Slider
                    className="price-range-slider"
                    getAriaLabel={() => 'Temperature range'}
                    value={[filterByPriceStore.minPrice, filterByPriceStore.maxPrice]}
                    onChange={(e, value, activeThumb) => setSliderValue(value, activeThumb)}
                    valueLabelDisplay="on"
                    valueLabelFormat={getLabel}
                    getAriaValueText={getLabel}
                    max={filterByPriceStore.maxPriceBound}
                    min={filterByPriceStore.minPriceBound}
                    size={"small"}
                />
            </div>
        </div>
    )
});
