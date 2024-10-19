import './styles.scss';
import {observer} from "mobx-react";
import {CheckBox} from "../../../shared/ui/check-box/ui";
import {useEffect} from "react";
import {tagsFilterStore} from "../model/tags-filter-store";
import {useTypedTranslation} from "../../../app/i18n/use-typed-translation";
import {Skeleton} from "antd";

export const TagsList = observer(() => {
    const {t} = useTypedTranslation()

    useEffect(() => {
        tagsFilterStore.loadTags();
    }, []);

    if(tagsFilterStore.isLoading) {
        return <div className="tags">
            <span className="filters__title tags__title">{t("Amenities")}</span>

            <Skeleton.Input active style={{width: "70%"}}/>
            <Skeleton.Input active style={{width: "90%"}}/>
            <Skeleton.Input active style={{width: "60%"}}/>
            <Skeleton.Input active style={{width: "75%"}}/>
            <Skeleton.Input active style={{width: "85%"}}/>
        </div>
    }

    return <div className="tags">
        <span className="filters__title tags__title">{t("Amenities")}</span>

        {tagsFilterStore.tags.map(tag =>
            <CheckBox value={tagsFilterStore.selectedTags[tag]}
                      name={tag}
                      key={tag}
                      onValueChange={() => tagsFilterStore.toggleIsTagSelected(tag)}/>
        )}
    </div>
});
