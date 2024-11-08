import "./styles.scss";
import {Apartment} from "../../../shared/api/types/apartment";
import {TitleWithIcon} from "../../../shared/ui/title-with-icon";
import UsersIcon from "../../../assets/images/users.svg"
import GeoIcon from "../../../assets/images/geo-location-colorfull.svg"
import CardsIcon from "../../../assets/images/cards.svg"
import React, {useEffect} from "react";
import {LinkWithIcon} from "../../../shared/ui/link-with-icon";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import {currencyToPostfixMap} from "../../../shared/lib/currency-to-postfix-map";
import {observer} from "mobx-react";
import {Slider} from "../../../shared/ui/slider";
import {SwiperSlide} from "swiper/react";
import ImageNotFound from "../../../assets/images/no-image.jpg"
import {ShowContactsButton} from "./show-contacts";
import {formatPrice} from "../../../shared/lib/format-price";
import {useTypedTranslation} from "../../../app/i18n/use-typed-translation";
import {mapModalStore} from "../../../widgets/map-modal/model/map-modal-store";

type PropsType = {
    apartment: Apartment;
}

export const ApartmentCard = observer(({
                                           apartment: {
                                               title,
                                               guestQuantity,
                                               bedQuantity,
                                               roomQuantity,
                                               photos,
                                               price,
                                               landlordId,
                                               address,
                                               description,
                                               amenityGroups,
                                               area,
                                               id
                                           }
                                       }: PropsType) => {
    const {t} = useTranslation();

    useEffect(() => {

    }, [photos]);

    return <div className="apartment-card">
        <Slider withThumbs={false}
                items={(!photos[0] ? [ImageNotFound] : photos).map(image => <SwiperSlide>
                    <Link to={"apartment-details/" + id}>
                        <img src={image}
                             alt=""></img>
                    </Link></SwiperSlide>)}/>

        <div className="apartment-details">
            <span className="apartment-card__price">{t("From")} {formatPrice(price)}</span>

            <TitleWithIcon className="apartment-details__rooms-quantity"
                           icon={CardsIcon}
            >{t("Rooms", {count: roomQuantity})}</TitleWithIcon>
            <TitleWithIcon className="apartment-details__max-quests-quantity"
                           icon={UsersIcon}
            >{t("guest", {count: guestQuantity})} </TitleWithIcon>
            <a className="apartment-details__address"
               href={"./"}
            >{address}</a>
            <TitleWithIcon className="apartment-details__on-map-link"
                           icon={GeoIcon}
                           onClick={() => mapModalStore.showModal(address)}
            >На карте </TitleWithIcon>
            <Link className="apartment-details__description"
                  to={"apartment-details/" + id}>{title}</Link>

        </div>
        <ShowContactsButton/>
    </div>
});