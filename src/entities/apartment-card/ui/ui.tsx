import "./styles.scss";
import {Apartment} from "../../../shared/api/types/apartment";
import {TitleWithIcon} from "../../../shared/ui/title-with-icon";
import UsersIcon from "../../../assets/images/users.svg"
import GeoIcon from "../../../assets/images/geo-location-colorfull.svg"
import CardsIcon from "../../../assets/images/cards.svg"
import React, {useEffect, useState} from "react";
import {addressService} from "../../../shared/api/address-service";
import {LinkWithIcon} from "../../../shared/ui/link-with-icon";
import {ShowContactsButton} from "./show-contacts";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import {currencyToPostfixMap} from "../../../shared/lib/currency-to-postfix-map";
import NoImage from "../../../assets/images/no-image.jpg";

type PropsType = {
    apartment: Apartment;
}

export function ApartmentCard({
                                  apartment: {
                                      title,
                                      guestQuantity,
                                      bedsQuantity,
                                      roomsQuantity,
                                      photos,
                                      price,
                                      landlordId,
                                      address,
                                      description,
                                      amenities,
                                      square,
                                      id
                                  }
                              }: PropsType) {
    const {t} = useTranslation();

    return <div className="apartment-card">

        <Link className={"apartment-card-slider"} to={"/apartment-details/" + id}>
            <img src={photos[0] ||NoImage} alt=""/>
        </Link>
        <div className="apartment-details">
            <span className="apartment-card__price">{price.amount} {currencyToPostfixMap[price.currency]}</span>
            <TitleWithIcon className="apartment-details__rooms-quantity"
                           icon={CardsIcon}>{t("Rooms", {count: roomsQuantity})}</TitleWithIcon>
            <TitleWithIcon className="apartment-details__max-quests-quantity"
                           icon={UsersIcon}>{t("guest", {count: guestQuantity})} </TitleWithIcon>
            <a className="apartment-details__address" href={"./"}>{address}</a>
            <LinkWithIcon className="apartment-details__on-map-link" icon={GeoIcon} href={"/"}>На карте </LinkWithIcon>
            <span className="apartment-details__description">{description}</span>
        </div>
        <ShowContactsButton/>
    </div>
}