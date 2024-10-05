import './styles.scss';
import {Apartment} from "../../../shared/api/types/apartment";
import {AddToWishListButton} from "../../../features/add-to-wishlist/ui/add-to-wish-list-button";
import {OpenShareModal} from "./open-share-modal";
import {LinkWithIcon} from "../../../shared/ui/link-with-icon";
import GeoIcon from "../../../assets/images/geo-location-colorfull.svg";
import MetroIcon from "../../../assets/images/metro.svg";
import RatingIcon from "../../../assets/images/star.svg";
import RoomsIcon from "../../../assets/images/sleeping-man.svg";
import BedIcon from "../../../assets/images/bed.svg";
import GuestsIcon from "../../../assets/images/people.svg";
import ApartmentAreaIcon from "../../../assets/images/apartment-area.svg";

import React, {useEffect} from "react";
import {TitleWithIcon} from "../../../shared/ui/title-with-icon";
import {useTypedTranslation} from "../../../app/i18n/use-typed-translation";
import {currencyToPostfixMap} from "../../../shared/lib/currency-to-postfix-map";
import {OpenOrderModalButton} from "./open-order-modal/ui";
import {observer} from "mobx-react";
import {currencyStore} from "../../../features/select-currency";
import {OrderModal} from "../../../widgets/order-modal";
import FlatIcon from "../../../assets/images/temp/flat1.webp";
import {IconWithTwoTitles} from "../../../shared/ui/icon-with-two-titles";
import {useTranslation} from "react-i18next";
import {Separator} from "./separator";

type PropsType = {
    apartment: Apartment
}

export const ApartmentDetails = observer(({
                                              apartment: {
                                                  price,
                                                  apartmentId,
                                                  description,
                                                  photos,
                                                  title,
                                                  guestsQuantity,
                                                  bedsQuantity,
                                                  roomsQuantity,
                                                  areaInSquareMeters,
                                                  tags,
                                                  landlordId,
                                                  addressUUID
                                              }
                                          }: PropsType) => {
    const {t} = useTypedTranslation()
    const {t: tr} = useTranslation()

    useEffect(() => {
    }, [currencyStore.currency]);


    return <div className="apartment-details">
        <div className="apartment-details-top">
            <div className="max-width-wrapper">
                <h2 className="top__title">{title}</h2>
                <h3 className="top__sub-title">ID: {apartmentId}</h3>
            </div>
            <AddToWishListButton apartmentId={apartmentId}/>
            <OpenShareModal/>
        </div>
        <div className="apartment-details-mid">
            <div className="apartment-details-wrapper">
                <div className="apartment-images">
                    <img className="main-image" src={FlatIcon} alt=""/>
                    <div className="other-images">
                        {photos.slice(1).map(photo =>
                            <div className="image-wrapper">
                                <img className="image" src={FlatIcon} alt=""/>
                            </div>
                        )}
                    </div>
                </div>
                <div className="apartment-tabs">
                    <span className="apartment-tabs__tab active">{t("On Map")}</span>
                    <span className="apartment-tabs__tab">{t("Description")}</span>
                    <span className="apartment-tabs__tab">{t("Amenities")}</span>
                    <span className="apartment-tabs__tab">{t("Rules Of Residence")}</span>
                    <span className="apartment-tabs__tab">{t("Near The House")}</span>
                    <span className="apartment-tabs__tab">{t("Reviews")}</span>
                </div>

                <div className="apartment-properties">
                    {/*TODO refactor*/}
                    <IconWithTwoTitles icon={RoomsIcon} title={3} subTitle={tr("Room", {count: 3})}/>
                    <IconWithTwoTitles icon={BedIcon} title={3} subTitle={tr("Bed", {count: 3})}/>
                    <IconWithTwoTitles icon={GuestsIcon} title={3} subTitle={tr("Guest", {count: 3})}/>
                    <IconWithTwoTitles icon={ApartmentAreaIcon} title={3 + " м²"} subTitle={t("Area")}/>
                </div>
            </div>
            <div className="order-menu">
                <h2 className="order-menu__title">{description}</h2>
                <span className="order-menu__address">Независимости пр-т., 19, Минск</span>
                <LinkWithIcon className="order-menu__on-map-link" icon={GeoIcon} href={"/"}>На карте </LinkWithIcon>
                <TitleWithIcon className="order-menu__metro-station" icon={MetroIcon}>Октябрьская</TitleWithIcon>

                <div className="order-menu-prices">
                    <div className="price-option">
                        <span className="price">
                        {t("From")}
                            <span
                                className="price-option__price"> {price.amount}{currencyToPostfixMap[price.currency]}. </span>
                         / {t("Day")}
                        </span>
                        <TitleWithIcon className="rating" icon={RatingIcon}>5.0(1)</TitleWithIcon>
                    </div>
                </div>
                <div className="price-chips">
                    <div className="price-chip">
                        {t("Day")}
                        <span className="price-chip__price">{price.amount}{currencyToPostfixMap[price.currency]}.</span>
                    </div>
                </div>
                <OpenOrderModalButton/>
                <OrderModal apartmentAddress={addressUUID} apartmentImage={photos[0]} apartmentPrice={price}/>
            </div>
        </div>
    </div>
});
