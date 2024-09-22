import './styles.scss';
import {RangeInput} from "../../../shared/ui/range-input/ui";
import {useTypedTranslation} from "../../../app/i18n/use-typed-translation";
import {filterByAreaStore} from "../model/filter-by-area-store";
import {observer} from "mobx-react";

//TODO rename
export const FilterBySpace = observer(() => {
    const {t} = useTypedTranslation();

    return (
        <div className={"filter-by-space"}>
            <span className="filter-by-space__title">{t("Area")}</span>
            <RangeInput values={[filterByAreaStore.minArea, filterByAreaStore.maxArea]} onChange={(values) => {
                filterByAreaStore.setMinArea(values[0]);
                filterByAreaStore.setMaxArea(values[1]);
            }}/>
        </div>

    )
});
