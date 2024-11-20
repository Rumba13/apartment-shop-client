import "./styles.scss";
import RoomsIcon from "../../../assets/images/sleeping-man.svg";
import BedIcon from "../../../assets/images/bed.svg";
import GuestsIcon from "../../../assets/images/people.svg";
import ApartmentAreaIcon from "../../../assets/images/apartment-area.svg";
import React, { useEffect, useRef, useState } from "react";
import { useTypedTranslation } from "../../../app/i18n/use-typed-translation";
import { observer } from "mobx-react";
import { IconWithTwoTitles } from "../../../shared/ui/icon-with-two-titles";
import { useTranslation } from "react-i18next";
import { UUID } from "../../../shared/api/types/uuid";
import { apartmentDetailsStore } from "../model/apartment-details-store";
import { userStore } from "../../user";
import { currencyStore } from "../../../features/select-currency";
import { useNavigate } from "react-router-dom";
import { DeleteApartment } from "./delete-apartment-button";
import { Button } from "../../../shared/ui/button";
import UpdateIcon from "../../../assets/images/refresh.svg";
import { Map } from "../../../shared/ui/map";
import { ApartmentDetailsSkeleton } from "./skeleton";
import CalendarIcon from "../../../assets/images/calendar.svg";
import { AddApartmentToFavorites } from "../../../features/APARTMENT/add-apartment-to-favorites";
import { OrderIsSubmittedModal } from "./order-is-submitted-modal";
import { ApartmentDetailsSlider } from "./slider";
import { Tabs } from "./tabs";
import { ApartmentDetailsAside } from "./apartment-details-aside";
import { ApartmentDetailsAmenities } from "./apartment-details-amenities";
import { ApartmentDetailsDescription } from "./apartment-details-description";

type PropsType = {
   apartmentId: UUID;
};

export const ApartmentDetails = observer(({ apartmentId }: PropsType) => {
   const navigate = useNavigate();
   const { t } = useTranslation();
   const mapRef = useRef<HTMLDivElement>(null);
   const descriptionRef = useRef<HTMLDivElement>(null);
   const tagsRef = useRef<HTMLDivElement>(null);

   const tabs = [
      {
         title: t("On Map"),
         onClick: () => mapRef.current?.scrollIntoView(),
      },
      {
         title: t("Description"),
         onClick: () => descriptionRef.current?.scrollIntoView(),
      },
      {
         title: t("Amenities"),
         onClick: () => tagsRef.current?.scrollIntoView(),
      },
   ];

   useEffect(() => {
      apartmentDetailsStore.loadApartmentDetails(apartmentId, currencyStore.currency);
   }, [currencyStore.currency]);

   useEffect(() => {}, [userStore.user]);

   if (apartmentDetailsStore.isError) {
      return <div className="apartment-details">{t("Some error has occurred")}</div>;
   }
   if (apartmentDetailsStore.isLoading) {
      return (
         <div className="apartment-details">
            <ApartmentDetailsSkeleton />
         </div>
      );
   }
   if (!apartmentDetailsStore.apartment) {
      return <div className="apartment-details"></div>;
   }

   const { price, description, photos, title, guestQuantity, roomQuantity, area, amenityGroups, address, sleepPlaces } = apartmentDetailsStore.apartment;

   return (
      <div className="apartment-details">
         <OrderIsSubmittedModal />

         <div className="apartment-details-actions">
            {userStore.user?.isSuperuser && (
               <>
                  <DeleteApartment apartmentId={apartmentId} />
                  <Button icon={CalendarIcon} onClick={() => navigate(`/calendar/${apartmentId}`)} title={t("Calendar")} />
                  <Button icon={UpdateIcon} onClick={() => navigate(`/update-apartment/${apartmentId}`)} title={"Обновить"} />
               </>
            )}
            <AddApartmentToFavorites apartmentId={apartmentId} />
         </div>

         <div className="apartment-details-mid">
            <div className="apartment-details-wrapper">
               <ApartmentDetailsSlider images={photos} />
               <Tabs tabs={tabs} />
               <div className="apartment-properties">
                  <IconWithTwoTitles icon={RoomsIcon} title={roomQuantity} subTitle={t("Room", { count: roomQuantity })} />
                  <IconWithTwoTitles icon={BedIcon} title={sleepPlaces} subTitle={t("Sleep places")} />
                  <IconWithTwoTitles icon={GuestsIcon} title={guestQuantity} subTitle={t("Guest")} />
                  <IconWithTwoTitles icon={ApartmentAreaIcon} title={area + " м²"} subTitle={t("Area")} />
               </div>
               <div className="map section" ref={mapRef}>
                  <h3 className="title">{t("On Map")}</h3>
                  <Map address={address} />
               </div>
               <ApartmentDetailsDescription descriptionRef={descriptionRef} description={description} />
               <ApartmentDetailsAmenities tags={amenityGroups} tagListRef={tagsRef} />
            </div>
            <ApartmentDetailsAside scrollToMap={() => mapRef.current?.scrollIntoView()} apartmentId={apartmentId} title={title} address={address} price={price} />
         </div>
      </div>
   );
});
