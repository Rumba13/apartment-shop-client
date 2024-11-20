import "./styles.scss";
import { observer } from "mobx-react";
import { CheckBox } from "../../../shared/ui/check-box/ui";
import { useEffect } from "react";
import { tagsFilterStore } from "../model/tags-filter-store";
import { useTypedTranslation } from "../../../app/i18n/use-typed-translation";
import { Skeleton } from "antd";
import { TagSkeleton } from "./tag-skeleton";

export const TagsList = observer(() => {
   const { t } = useTypedTranslation();

   useEffect(() => {
      tagsFilterStore.loadTags();
   }, []);

   if (tagsFilterStore.isLoading) {
      return (
         <div className="tags">
            <span className="filters__title tags__title">{t("Amenities")}</span>

            <TagSkeleton textSkeletonWidth="80%" />
            <TagSkeleton textSkeletonWidth="95%" />
            <TagSkeleton textSkeletonWidth="10%" />
            <TagSkeleton textSkeletonWidth="87%" />
            <TagSkeleton textSkeletonWidth="80%" />
            <TagSkeleton textSkeletonWidth="95%" />
            <TagSkeleton textSkeletonWidth="10%" />
            <TagSkeleton textSkeletonWidth="87%" />
         </div>
      );
   }

   return (
      <div className="tags">
         <span className="filters__title tags__title">{t("Amenities")}</span>

         {tagsFilterStore.tags.map(tag => (
            <CheckBox value={tagsFilterStore.selectedTags[tag]} name={tag} key={tag} onValueChange={() => tagsFilterStore.toggleIsTagSelected(tag)} />
         ))}
      </div>
   );
});
