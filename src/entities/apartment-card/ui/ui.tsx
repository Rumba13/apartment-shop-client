import "./styles.scss";
import {Apartment} from "../../../shared/api/types/apartment";
import {currencyToPostfixMap} from "../../../features/select-currency";
import {TitleWithIcon} from "./title-with-icon";
import UsersIcon from "../../../assets/images/users.svg"
import GeoIcon from "../../../assets/images/geo-location-colorfull.svg"
import CardsIcon from "../../../assets/images/cards.svg"
import React, {useEffect, useState} from "react";
import {addressService} from "../../../shared/api/address-service";
import {LinkWithIcon} from "./link-with-icon";
import {ShowContactsButton} from "./show-contacts";
import {useTranslation} from "react-i18next";

type PropsType = {
    apartment: Apartment;
}

export function ApartmentCard({
                                  apartment: {
                                      title,
                                      guestsQuantity,
                                      bedsQuantity,
                                      roomsQuantity,
                                      photos,
                                      price,
                                      landlordId,
                                      addressUUID,
                                      description,
                                      tags,
                                      areaInSquareMeters
                                  }
                              }: PropsType) {
    const [address, setAddress] = useState<string | null>(null)
    const {t} = useTranslation();
    useEffect(() => {
        addressService.getAddressByUUID(addressUUID).then(setAddress);
    }, [addressUUID]);

    if (!address) {
        return <></>
    }

    return <div className="apartment-card">
        <div className={"apartment-card-slider"}>
            <img src={photos[0]} alt=""/>
        </div>
        <div className="apartment-details">
            <span className="apartment-card__price">{price.amount} {currencyToPostfixMap[price.currency]}</span>
            <TitleWithIcon className="apartment-details__rooms-quantity"
                           icon={CardsIcon}>{t("Rooms", {count: roomsQuantity})}</TitleWithIcon>
            <TitleWithIcon className="apartment-details__max-quests-quantity"
                           icon={UsersIcon}>{t("guest", {count: guestsQuantity})} </TitleWithIcon>
            <a className="apartment-details__address" href={"./"}>{address}</a>
            <LinkWithIcon className="apartment-details__on-map-link" icon={GeoIcon} href={"/"}>На карте </LinkWithIcon>
            <span className="apartment-details__description">{description}</span>
        </div>
        <ShowContactsButton/>
    </div>
}