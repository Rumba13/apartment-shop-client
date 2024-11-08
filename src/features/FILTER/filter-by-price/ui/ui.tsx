import './styles.scss';
import {useTypedTranslation} from "../../../../app/i18n/use-typed-translation";
import {observer} from "mobx-react";
import {priceFilterStore} from "../model/price-filter-store";
import {currencyStore} from "../../../select-currency";
import {useEffect} from "react";
import RangeImage from "../../../../assets/images/mocked/price-range.png"
import {Slider} from "../../../../shared/ui/range/ui";
import {RangeInput} from "../../../../shared/ui/range-input/ui";
import {currencyToPostfixMap} from "../../../../shared/lib/currency-to-postfix-map";

export const PriceFilter = observer(() => {
    const {t} = useTypedTranslation();

    useEffect(() => {

    }, [currencyStore.currency]);


    const setSliderValue = (value: number[]) => {
        priceFilterStore.setMinPrice(value[0]);
        priceFilterStore.setMaxPrice(value[1]);
    }

    const getLabel = (value: number) => `${value || 0} ${currencyToPostfixMap[currencyStore.currency]}`

    return (
        <div className="filter-by-price">
            <span className="filters__title filter-by-price__title">{t("Price")}</span>
            <RangeInput className={"filter-by-price-inputs"}
                        onChange={(values: number[]) => {
                            priceFilterStore.setMinPrice(values[0]);
                            priceFilterStore.setMaxPrice(values[1]);
                            priceFilterStore.setOnCooldown()
                        }}
                        min={priceFilterStore.minPriceBound}
                        max={priceFilterStore.maxPriceBound}
                        values={[priceFilterStore.minPrice, priceFilterStore.maxPrice]}/>

            <div className="range-wrapper">
                <img className="range-wrapper__image" src={RangeImage} alt=''/>

                <Slider className="price-range-slider" getLabel={getLabel}
                        onChange={(value) => {
                            setSliderValue(value)
                            priceFilterStore.setOnCooldown()
                        }}
                        max={priceFilterStore.maxPriceBound} min={priceFilterStore.minPriceBound}
                        value={[priceFilterStore.minPrice, priceFilterStore.maxPrice]}/>
            </div>
        </div>
    )
});
