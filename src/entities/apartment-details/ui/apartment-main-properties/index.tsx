import "./styles.scss";
import { TitleWithIcon } from "../../../../shared/ui/title-with-icon";
import RoomsIcon from "../../../../assets/images/sleeping-man.svg";
import { IconWithTwoTitles } from "../../../../shared/ui/icon-with-two-titles";
import BedIcon from "../../../../assets/images/bed.svg";
import GuestsIcon from "../../../../assets/images/people.svg";
import ApartmentAreaIcon from "../../../../assets/images/apartment-area.svg";
import React from "react";
import { useTranslation } from "react-i18next";
import { useScreenWidth } from "../../../../shared/ui/use-screen-width";
import clsx from "clsx";

type PropsType = {
   roomQuantity: number;
   sleepPlaces: string;
   guestQuantity: number;
   area: number;
};

export function ApartmentMainProperties({ roomQuantity, sleepPlaces, guestQuantity, area }: PropsType) {
   const { t } = useTranslation();
   const screenWidth = useScreenWidth();

   if (screenWidth < 570) {
      return (
         <div className={clsx("apartment-properties grid")}>
            <TitleWithIcon className="tags-list__item" withLi icon={RoomsIcon}>
               {t("Room_many")}:{roomQuantity}
            </TitleWithIcon>
            <TitleWithIcon className="tags-list__item" withLi icon={BedIcon}>
               {t("Sleep places")}:{sleepPlaces}
            </TitleWithIcon>
            <TitleWithIcon className="tags-list__item" withLi icon={GuestsIcon}>
               {t("Guests")}:{guestQuantity}
            </TitleWithIcon>
            <TitleWithIcon className="tags-list__item" withLi icon={ApartmentAreaIcon}>
               {t("Area")}:{area + " м²"}
            </TitleWithIcon>
         </div>
      );
   }

   return (
      <div className="apartment-properties">
         <IconWithTwoTitles icon={RoomsIcon} title={roomQuantity} subTitle={t("Room", { count: roomQuantity })} />
         <IconWithTwoTitles icon={BedIcon} title={sleepPlaces} subTitle={t("Sleep places")} />
         <IconWithTwoTitles icon={GuestsIcon} title={guestQuantity} subTitle={t("Guest")} />
         <IconWithTwoTitles icon={ApartmentAreaIcon} title={area + " м²"} subTitle={t("Area")} />
      </div>
   );
}
