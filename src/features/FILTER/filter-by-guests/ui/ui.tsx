import './styles.scss';
import {observer} from "mobx-react";
import {guestsCountStore} from "../model/guests-count-store";
import {useTypedTranslation} from "../../../../app/i18n/use-typed-translation";
import {useEffect} from "react";
import {InputNumber} from "../../../../shared/ui/input-number";

export const FilterByGuestsCount = observer(() => {

    const {t} = useTypedTranslation()

    useEffect(() => {

    }, []);

    return (
        <div className="filter-by-guests-count">
            <span className="filters__title">{t("Guests")}</span>

            <InputNumber value={guestsCountStore.minGuestsCount}
                         min={0}
                         max={Infinity}
                         onChange={(count) => guestsCountStore.setMinGuestsCount(count)}
            />
        </div>
    )
})
