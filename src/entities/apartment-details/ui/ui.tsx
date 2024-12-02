import "./styles.scss";
import React, { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react";
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
import { useScreenWidth } from "../../../shared/ui/use-screen-width";
import clsx from "clsx";
import { ApartmentMainProperties } from "./apartment-main-properties";

type PropsType = {
   apartmentId: UUID;
};

const apartmentDetailsAsideBreakpointPx = 900;

export const ApartmentDetails = observer(({ apartmentId }: PropsType) => {
   const navigate = useNavigate();
   const { t } = useTranslation();
   const mapRef = useRef<HTMLDivElement>(null);
   const descriptionRef = useRef<HTMLDivElement>(null);
   const tagsRef = useRef<HTMLDivElement>(null);
   const screenWidth = useScreenWidth();

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

   const { price, description, photos, title, guestQuantity, roomQuantity, area, amenityGroups, address, sleepPlaces, landlordPhoneNumber, landlordFirstName } = apartmentDetailsStore.apartment;

   const ApartmentDetailsAsideComponent = (
      <ApartmentDetailsAside contact={{ phone: landlordPhoneNumber, name: landlordFirstName }} scrollToMap={() => mapRef.current?.scrollIntoView()} apartmentId={apartmentId} title={title} address={address} price={price} />
   );

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
         </div>

         <div className={clsx("apartment-details-mid", screenWidth <= apartmentDetailsAsideBreakpointPx && "no-aside")}>
            <div className="apartment-details-wrapper">
               <AddApartmentToFavorites apartmentId={apartmentId} variant="mini" />
               <ApartmentDetailsSlider images={photos} />
               {screenWidth <= apartmentDetailsAsideBreakpointPx && ApartmentDetailsAsideComponent}

               <Tabs tabs={tabs} />
               <ApartmentMainProperties area={area} guestQuantity={guestQuantity} roomQuantity={roomQuantity} sleepPlaces={sleepPlaces} />
               <div className="map section" ref={mapRef}>
                  <h3 className="title">{t("On Map")}</h3>
                  <Map address={address} />
               </div>
               <ApartmentDetailsDescription descriptionRef={descriptionRef} description={description} />
               <ApartmentDetailsAmenities tags={amenityGroups} tagListRef={tagsRef} />
            </div>
            {screenWidth >= apartmentDetailsAsideBreakpointPx && ApartmentDetailsAsideComponent}
         </div>
      </div>
   );
});
