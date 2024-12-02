import "./styles.scss";
import { Apartment } from "../../../shared/api/types/apartment";
import { TitleWithIcon } from "../../../shared/ui/title-with-icon";
import UsersIcon from "../../../assets/images/users.svg";
import GeoIcon from "../../../assets/images/geo-location-colorfull.svg";
import CardsIcon from "../../../assets/images/cards.svg";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react";
import { ShowContactsButton } from "./show-contacts";
import { formatPrice } from "../../../shared/lib/format-price";
import { mapModalStore } from "../../../widgets/map-modal/model/map-modal-store";
import { AddApartmentToFavorites } from "../../../features/APARTMENT/add-apartment-to-favorites";
import { ApartmentCardSlider } from "./slider";

type PropsType = {
   apartment: Apartment;
};

export const ApartmentCard = observer(({ apartment: { title, guestQuantity, roomQuantity, photos, price, address, id, landlordFirstName, landlordPhoneNumber } }: PropsType) => {
   const { t } = useTranslation();

   return (
      <div className="apartment-card">
         <ApartmentCardSlider apartmentId={id} images={photos} />
         <AddApartmentToFavorites apartmentId={id} variant="mini" />

         <div className="apartment-details">
            <span className="apartment-card__price">
               {t("From")} {formatPrice(price)}
            </span>

            <TitleWithIcon className="apartment-details__rooms-quantity" icon={CardsIcon}>
               {t("Rooms", { count: roomQuantity })}
            </TitleWithIcon>
            <TitleWithIcon className="apartment-details__max-quests-quantity" icon={UsersIcon}>
               {t("guest", { count: guestQuantity })}
            </TitleWithIcon>
            <a
               className="apartment-details__address"
               onClick={e => {
                  mapModalStore.showModal(address);
                  e.preventDefault();
                  return false;
               }}>
               {address}
            </a>
            <TitleWithIcon className="apartment-details__on-map-link" icon={GeoIcon} onClick={() => mapModalStore.showModal(address)}>
               На карте
            </TitleWithIcon>
            <span className="apartment-details__description">{title}</span>
         </div>
         <ShowContactsButton
            contact={{
               phone: landlordPhoneNumber,
               name: landlordFirstName,
            }}
         />
      </div>
   );
});
