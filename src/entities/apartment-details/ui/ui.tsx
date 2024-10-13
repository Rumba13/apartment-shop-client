import './styles.scss';
import {AddToWishListButton} from "../../../features/add-to-wishlist/ui/add-to-wish-list-button";
import {LinkWithIcon} from "../../../shared/ui/link-with-icon";
import GeoIcon from "../../../assets/images/geo-location-colorfull.svg";
import MetroIcon from "../../../assets/images/metro.svg";
import RatingIcon from "../../../assets/images/star.svg";
import RoomsIcon from "../../../assets/images/sleeping-man.svg";
import BedIcon from "../../../assets/images/bed.svg";
import GuestsIcon from "../../../assets/images/people.svg";
import ApartmentAreaIcon from "../../../assets/images/apartment-area.svg";
import MarkIcon from "../../../assets/images/check.svg";
import React, {useEffect, useState} from "react";
import {TitleWithIcon} from "../../../shared/ui/title-with-icon";
import {useTypedTranslation} from "../../../app/i18n/use-typed-translation";
import {currencyToPostfixMap} from "../../../shared/lib/currency-to-postfix-map";
import {OpenOrderModalButton} from "./open-order-modal/ui";
import {observer} from "mobx-react";
import {OrderModal} from "../../../widgets/order-modal";
import FlatIcon from "../../../assets/images/temp/flat1.webp";
import {IconWithTwoTitles} from "../../../shared/ui/icon-with-two-titles";
import {useTranslation} from "react-i18next";
import {UUID} from "../../../shared/api/types/uuid";
import {apartmentDetailsStore} from "../model/apartment-details-store";
import {userStore} from "../../user";
import {currencyStore} from "../../../features/select-currency";
import {Link} from "react-router-dom";
import {DeleteApartment} from "./delete-apartment-button";
import {CONSTANTS} from "../../../shared/lib/constants";

type PropsType = {
    apartmentId: UUID
}

export const ApartmentDetails = observer(({
                                              apartmentId
                                          }: PropsType) => {
    const {t} = useTypedTranslation()
    const {t: tr} = useTranslation()
    const [isCollapsibleExpanded, setIsCollapsibleExpanded] = useState<boolean>(false)

    const testItems = ["Кирпичный дом", "Лифт", "Этаж: 2", "Этажей: 6"].map(li =>
        <TitleWithIcon className={"tags-list__item amenities-list__item"} withLi icon={MarkIcon}>
            {li}
        </TitleWithIcon>);


    useEffect(() => {
        apartmentDetailsStore.loadApartmentDetails(apartmentId, currencyStore.currency);
    }, [currencyStore.currency]);

    if (apartmentDetailsStore.isError) {
        return <div>Error...</div>
    }
    if (apartmentDetailsStore.isLoading || !apartmentDetailsStore.apartment) {
        return <div>Loading...</div>
    }
    const {
        price,
        id,
        description,
        photos,
        title,
        guestsQuantity,
        bedsQuantity,
        roomsQuantity,
        area,
        amenities,
        landlordId,
        address
    } = apartmentDetailsStore.apartment;

    console.log(photos.join(" "))

    return <div className="apartment-details">
        <OrderModal apartmentAddress={address} apartmentImage={CONSTANTS.IMAGE_SERVER_URL  + photos[0]} apartmentPrice={price}/>
        <div className="apartment-details-top">
            <div className="max-width-wrapper">
                <h2 className="top__title">{title}</h2>

                {userStore.user?.isSuperuser
                    ? <Link className="top__sub-title" to={`/update-apartment/${apartmentId}`}>ID: {id}</Link>
                    : <h3 className="top__sub-title">ID: {id}</h3>
                }


            </div>
            <AddToWishListButton apartmentId={id}/>
            {userStore.user?.isSuperuser && <DeleteApartment apartmentId={apartmentId}/>}
        </div>
        <div className="apartment-details-mid">
            <div className="apartment-details-wrapper">
                <div className="apartment-images">
                    <img className="main-image" src={CONSTANTS.IMAGE_SERVER_URL  + photos[0]} alt=""/>
                    <div className="other-images">
                        {photos.slice(1).map(photo =>
                            <div className="image-wrapper">
                                <img className="image" src={CONSTANTS.IMAGE_SERVER_URL  + photo} alt=""/>
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
                    <IconWithTwoTitles icon={RoomsIcon} title={roomsQuantity}
                                       subTitle={tr("Room", {count: roomsQuantity})}/>
                    <IconWithTwoTitles icon={BedIcon} title={bedsQuantity} subTitle={tr("Bed", {count: bedsQuantity})}/>
                    <IconWithTwoTitles icon={GuestsIcon} title={guestsQuantity}
                                       subTitle={tr("Guest", {count: guestsQuantity})}/>
                    <IconWithTwoTitles icon={ApartmentAreaIcon} title={area + " м²"} subTitle={t("Area")}/>
                </div>
                <div className="apartment-description">
                    <h2 className="apartment-description__title">{t("Description")}</h2>
                    <span className="apartment-description__description"
                          dangerouslySetInnerHTML={{__html: description}}></span>
                </div>
                <div className="house-description">
                    <h2 className="house-description__title">{t("House Description")}</h2>
                    <ul className="house-description-list">
                        {["Кирпичный дом", "Лифт", "Этаж: 2", "Этажей: 6"].map(li =>
                            <TitleWithIcon className={"house-description__item"} withLi icon={MarkIcon}>
                                {li}
                            </TitleWithIcon>)}
                    </ul>
                </div>
                <div className="section amenities">
                    <h2 className="amenities__title">{t("Amenities")}</h2>

                    <div className="amenities-list-wrapper">
                        <h3 className="amenities-list__title">{t("In The Kitchen")}</h3>
                        <ul className="amenities-list">
                            {amenities.map(li =>
                                <TitleWithIcon className={"tags-list__item amenities-list__item"} withLi
                                               icon={MarkIcon}>
                                    {li}
                                </TitleWithIcon>)}
                        </ul>
                    </div>
                    <div className="amenities-list-wrapper">
                        <h3 className="amenities-list__title">{t("In The Bathroom")}</h3>
                        <ul className="amenities-list">
                            {testItems}
                        </ul>
                    </div>
                    <div className="amenities-list-wrapper">
                        <h3 className="amenities-list__title">{t("Entertainment And Multimedia")}</h3>
                        <ul className="amenities-list">
                            {testItems}
                        </ul>
                    </div>
                    <div className="amenities-list-wrapper">
                        <h3 className="amenities-list__title">{t("Security")}</h3>
                        <ul className="amenities-list">
                            {testItems}
                        </ul>
                    </div>
                    <div className="amenities-list-wrapper">
                        <h3 className="amenities-list__title">{t("Laundry And Linen")}</h3>
                        <ul className="amenities-list">
                            {testItems}
                        </ul>
                    </div>
                    <div className="amenities-list-wrapper">
                        <h3 className="amenities-list__title">{t("Amenities Outside")}</h3>
                        <ul className="amenities-list">
                            {testItems}
                        </ul>
                    </div>


                </div>
                <div className="section rules-of-residence">
                    <h3 className="title">{t("Rules Of Residence")}</h3>
                    <ul className="tags-list">
                        {testItems}
                    </ul>
                </div>
                <div className="section methods-of-payments">
                    <h3 className="title">{t("Methods Of Payments")}</h3>
                    <ul className="tags-list">
                        {testItems}
                    </ul>
                </div>
                <div className="section near-the-house">
                    <h3 className="title">{t("Near The House")}</h3>
                    <ul className="near-the-house-list">
                        <li>Центральный детский парк культуры и отдыха им. Максима Горького - 1.15 км</li>
                        <li>Петропавловский собор - 0.79 км</li>
                        <li>Белорусский государственный цирк - 0.85 км</li>
                        {isCollapsibleExpanded && <>
                            <li>Верхний город - 0.44 км</li>
                            <li>Ворота Минска - 0.96 км</li>
                            <li>Государственный музей истории белорусской литературы - 0.96 км</li>
                            <li>Дворец Республики - 0.43 км</li>
                            <li>Дом Ваньковичей - 0.6 км</li>
                            <li>Дом-музей I съезда РСДРП - 1.3 км</li>
                            <li>Железнодорожный вокзал - 1.07 км</li>
                        </>}
                    </ul>
                    {!isCollapsibleExpanded &&
                        <button className="show-more"
                                onClick={() => setIsCollapsibleExpanded(true)}>{t("Show More")}</button>}
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
            </div>
        </div>
    </div>
});
