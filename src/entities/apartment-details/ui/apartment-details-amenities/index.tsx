import "./styles.scss";
import { TitleWithIcon } from "../../../../shared/ui/title-with-icon";
import MarkIcon from "../../../../assets/images/check.svg";
import React from "react";
import { AmenityGroup } from "../../../../shared/api/types/amenity-groups-from-backend";
import { useTranslation } from "react-i18next";

type PropsType = {
   tagListRef: React.RefObject<HTMLDivElement>;
   tags: AmenityGroup[];
};

export function ApartmentDetailsAmenities({ tagListRef, tags }: PropsType) {
   const { t } = useTranslation();

   return (
      <div className="tags section" ref={tagListRef}>
         <h2 className="tags__title">{t("Amenities")}</h2>
         {tags.map(tagGroup => (
            <div className="tags-list-wrapper" key={tagGroup.name}>
               <h3 className="tags-list__title">{tagGroup.name}</h3>
               <ul className="tags-list">
                  {tagGroup.amenities.map(li => (
                     <TitleWithIcon className="tags-list__item" withLi key={li} icon={MarkIcon}>
                        {li}
                     </TitleWithIcon>
                  ))}
               </ul>
            </div>
         ))}
      </div>
   );
}
