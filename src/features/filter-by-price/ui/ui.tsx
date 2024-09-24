import './styles.scss';
import {useTypedTranslation} from "../../../app/i18n/use-typed-translation";
import {observer} from "mobx-react";
import {priceFilterStore} from "../model/price-filter-store";
import {currencyStore, currencyToPostfixMap} from "../../select-currency";
import {useEffect} from "react";
import RangeImage from "../../../assets/images/mocked/price-range.png"
import {Slider} from "../../../shared/ui/range/ui";
import {RangeInput} from "../../../shared/ui/range-input/ui";

export const PriceFilter = observer(() => {
    const {t} = useTypedTranslation();

    //TODO add values validation

    useEffect(() => {

    }, [currencyStore.currency]);


    const setSliderValue = (value: number | number[], activeThumb: number) => {
        if (Array.isArray(value)) {
            priceFilterStore.setMinPrice(value[0]);
            priceFilterStore.setMaxPrice(value[1]);
        } else {
            if (activeThumb === 0) {
                priceFilterStore.setMinPrice(value);
            } else {
                priceFilterStore.setMaxPrice(value);
            }
        }
    }

    const getLabel = (value: number) => `${value || 0} ${currencyToPostfixMap[currencyStore.currency]}`

    //const validateValue = (value:number) => Math.min(filterByPriceStore.maxPriceBound, Math.max(filterByPriceStore.minPriceBound, value));

    return (
        <div className="filter-by-price">
            <span className="filters__title filter-by-price__title">{t("Price")}</span>
            <RangeInput className={"filter-by-price-inputs"}
                        onChange={(values: number[]) => {
                            priceFilterStore.setMinPrice(values[0]);
                            priceFilterStore.setMaxPrice(values[1]);
                        }}
                        values={[priceFilterStore.minPrice, priceFilterStore.maxPrice]}/>

            <div className="slider-wrapper">
                <img className={"slider-wrapper__image"} src={RangeImage} alt=''/>

                <Slider className={"price-range-slider"} getLabel={getLabel}
                        onChange={(e, value, activeThumb) => setSliderValue(value, activeThumb)}
                        max={priceFilterStore.maxPriceBound} min={priceFilterStore.minPriceBound}
                        value={[priceFilterStore.minPrice, priceFilterStore.maxPrice]}/>
            </div>
        </div>
    )
});
