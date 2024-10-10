import './styles.scss';
import {RangeInput} from "../../../shared/ui/range-input/ui";
import {useTypedTranslation} from "../../../app/i18n/use-typed-translation";
import {areaFilterStore} from "../model/area-filter-store";
import {observer} from "mobx-react";

//TODO rename
export const AreaFilter = observer(() => {
    const {t} = useTypedTranslation();

    return (
        <div className={"filter-by-space"}>
            <span className="filters__title filter-by-space__title">{t("Area")}</span>
            <RangeInput
                max={areaFilterStore.maxAreaBound}
                min={areaFilterStore.minAreaBound}
                values={[areaFilterStore.minArea, areaFilterStore.maxArea]} onChange={(values) => {
                areaFilterStore.setMinArea(values[0]);
                areaFilterStore.setMaxArea(values[1]);
            }}/>
        </div>

    )
});
