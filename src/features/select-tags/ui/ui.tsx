import './styles.scss';
import {observer} from "mobx-react";
import {CheckBox} from "../../../shared/ui/check-box/ui";
import {useEffect} from "react";
import {tagsFilterStore} from "../model/tags-filter-store";
import {useTypedTranslation} from "../../../app/i18n/use-typed-translation";

export const TagsList = observer(() => {
    const {t} = useTypedTranslation()

    useEffect(() => {
        tagsFilterStore.loadTags();
    }, []);

    return <div className="tags">
        <span className="filters__title tags__title">{t("Amenities")}</span>

        {tagsFilterStore.tags.map(tag =>
            <CheckBox value={tagsFilterStore.selectedTags[tag]} name={tag}
                      onValueChange={() => tagsFilterStore.toggleIsTagSelected(tag)}/>
        )}
    </div>
});
