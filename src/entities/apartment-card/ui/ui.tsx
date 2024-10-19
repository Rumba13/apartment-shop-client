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
import NoImage from "../../../assets/images/no-image.jpg";

import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation, Pagination} from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation'
import 'swiper/css/pagination';

import {observer} from "mobx-react";

type PropsType = {
    apartment: Apartment;
}

export const ApartmentCard = observer(({
                                           apartment: {
                                               title,
                                               guestsQuantity,
                                               bedsQuantity,
                                               roomsQuantity,
                                               photos,
                                               price,
                                               landlordId,
                                               address,
                                               description,
                                               amenities,
                                               area,
                                               id
                                           }
                                       }: PropsType) => {
    const {t} = useTranslation();

    useEffect(() => {
    }, [photos]);

    return <div className="apartment-card">
        <div className="apartment-card-slider"
        >
            <Swiper
                modules={[Navigation, Pagination]}
                slidesPerView={1}
                navigation={{prevEl: ".swiper-button-prev", nextEl: ".swiper-button-next"}}
                pagination={{type:"bullets", clickable:true, el:".swiper-pagination"}}
            >
                <div className="swiper-pagination"></div>
                <div className="swiper-button-prev"></div>
                <div className="swiper-button-next"></div>
                {photos.map(img => <SwiperSlide key={String(img)}>
                    <Link className="slider-link"
                          to={"/apartment-details/" + id}
                    >
                        <img src={img || NoImage}
                             alt={""}
                        />
                    </Link>
                </SwiperSlide>)}
            </Swiper>
        </div>

        <div className="apartment-details">
            <span className="apartment-card__price">{price.amount} {currencyToPostfixMap[price.currency]}</span>
            <TitleWithIcon className="apartment-details__rooms-quantity"
                           icon={CardsIcon}
            >{t("Rooms", {count: roomsQuantity})}</TitleWithIcon>
            <TitleWithIcon className="apartment-details__max-quests-quantity"
                           icon={UsersIcon}
            >{t("guest", {count: guestsQuantity})} </TitleWithIcon>
            <a className="apartment-details__address"
               href={"./"}
            >{address}</a>
            <LinkWithIcon className="apartment-details__on-map-link"
                          icon={GeoIcon}
                          href={"/"}
            >На карте </LinkWithIcon>
            <span className="apartment-details__description">{description}</span>
        </div>
    </div>
});