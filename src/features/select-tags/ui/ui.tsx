import './styles.scss';
import {observer} from "mobx-react";
import {CheckBox} from "../../../shared/ui/check-box/ui";
import {useEffect} from "react";
import {tagsService} from "../../../shared/api/tags-service";
import {tagsStore} from "../model/tags-store";
import {useTypedTranslation} from "../../../app/i18n/use-typed-translation";

export const TagsList = observer(() => { //TODO rename to tags
    const {t} = useTypedTranslation()

    useEffect(() => {
        tagsService.loadTags().then(tagsStore.setTags);
    }, []);

    return <div className="tags">
        <span className="filters__title tags__title">{t("Amenities")}</span>

        {tagsStore.tags.map(tag =>
            <CheckBox value={tagsStore.selectedTags[tag]} name={tag}
                      onValueChange={() => tagsStore.toggleIsTagSelected(tag)}/>
        )}
    </div>
});
