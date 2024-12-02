import "./styles.scss";
import { observer } from "mobx-react";
import { CheckBox } from "../../../shared/ui/check-box/ui";
import { useEffect } from "react";
import { tagsFilterStore } from "../model/tags-filter-store";
import { TagSkeleton } from "./tag-skeleton";
import { useTranslation } from "react-i18next";
import { favoritesStore } from "../../APARTMENT/add-apartment-to-favorites/model/favorites-store";

export const TagsList = observer(() => {
   const { t } = useTranslation();

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
