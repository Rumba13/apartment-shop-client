import "./styles.scss";
import clsx from "clsx";
import { SvgIcon } from "../../../../shared/ui/svg-icon";
import ArrowIcon from "../../../../assets/images/arrow.svg";
import React, { useRef, useState } from "react";
import { useTypedTranslation } from "../../../../app/i18n/use-typed-translation";

type PropsType = {
   descriptionRef: React.RefObject<HTMLDivElement>;
   description: string;
};

export function ApartmentDetailsDescription({ descriptionRef, description }: PropsType) {
   const { t } = useTypedTranslation();
   const descriptionContentRef = useRef<HTMLDivElement>(null);
   const [isDescriptionExpanded, setIsDescriptionExpanded] = useState<boolean>(false);

   const expandDescription = () => {
      if (!descriptionContentRef.current) return;
      descriptionContentRef.current.style.setProperty("--scroll-height", descriptionContentRef.current.scrollHeight + "px");
      setIsDescriptionExpanded(true);
   };

   return (
      <div className="apartment-description" ref={descriptionRef}>
         <h2 className="apartment-description__title">{t("Description")}</h2>
         <span className={clsx("apartment-description__description", isDescriptionExpanded && "expanded")}
               ref={descriptionContentRef}>
            {description}
         </span>

         <button className="apartment-description__button"
                 onClick={() => (isDescriptionExpanded ? setIsDescriptionExpanded(false) : expandDescription())}>
            {t(isDescriptionExpanded ? "Collapse Description" : "Expand Description")}
            <SvgIcon
               icon={ArrowIcon}
               style={{ transform: isDescriptionExpanded ? "" : "rotate(180deg)" }}
            />
         </button>
      </div>
   );
}
