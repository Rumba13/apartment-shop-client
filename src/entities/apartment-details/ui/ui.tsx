import './styles.scss';
import {LinkWithIcon} from "../../../shared/ui/link-with-icon";
import GeoIcon from "../../../assets/images/geo-location-colorfull.svg";
import MetroIcon from "../../../assets/images/metro.svg";
import RatingIcon from "../../../assets/images/star.svg";
import RoomsIcon from "../../../assets/images/sleeping-man.svg";
import BedIcon from "../../../assets/images/bed.svg";
import GuestsIcon from "../../../assets/images/people.svg";
import ApartmentAreaIcon from "../../../assets/images/apartment-area.svg";
import MarkIcon from "../../../assets/images/check.svg";
import React, {useEffect, useRef, useState} from "react";
import {TitleWithIcon} from "../../../shared/ui/title-with-icon";
import {useTypedTranslation} from "../../../app/i18n/use-typed-translation";
import {currencyToPostfixMap} from "../../../shared/lib/currency-to-postfix-map";
import {OpenOrderModalButton} from "./open-order-modal/ui";
import {observer} from "mobx-react";
import {OrderModal} from "../../../widgets/order-modal";
import {IconWithTwoTitles} from "../../../shared/ui/icon-with-two-titles";
import {useTranslation} from "react-i18next";
import {UUID} from "../../../shared/api/types/uuid";
import {apartmentDetailsStore} from "../model/apartment-details-store";
import {userStore} from "../../user";
import {currencyStore} from "../../../features/select-currency";
import {Link, useNavigate} from "react-router-dom";
import {DeleteApartment} from "./delete-apartment-button";
import NoImage from "../../../assets/images/no-image.jpg"
import {Slider} from "../../../shared/ui/slider";
import {SwiperSlide} from "swiper/react";
import {Button} from "../../../shared/ui/button";
import UpdateIcon from "../../../assets/images/refresh.svg";
import clsx from "clsx";
import ImageNotFound from "../../../assets/images/no-image.jpg";

type PropsType = {
    apartmentId: UUID
}

export const ApartmentDetails = observer(({
                                              apartmentId
                                          }: PropsType) => {
    const {t} = useTypedTranslation()
    const navigate = useNavigate()
    const {t: tr} = useTranslation()
    const [isCollapsibleExpanded, setIsCollapsibleExpanded] = useState<boolean>(false)

    const [currentTab, setCurrentTab] = useState(0);

    const mapRef = useRef<HTMLDivElement>(null)
    const descriptionRef = useRef<HTMLDivElement>(null)
    const tagsRef = useRef<HTMLDivElement>(null)
    const rulesRef = useRef<HTMLDivElement>(null)
    const nearToApartmentRef = useRef<HTMLDivElement>(null)

    const testItems = ["Кирпичный дом", "Лифт", "Этаж: 2", "Этажей: 6"].map(li =>
        <TitleWithIcon className={"tags-list__item amenities-list__item"}
                       withLi
                       key={li}
                       icon={MarkIcon}
        >
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
        guestQuantity,
        bedQuantity,
        roomQuantity,
        area,
        amenityGroups,
        landlordId,
        address,
        sleepPlaces
    } = apartmentDetailsStore.apartment;

    return <div className="apartment-details">
        <OrderModal apartmentMaxGuests={guestQuantity}
                    apartmentId={apartmentId}
                    apartmentAddress={address}
                    apartmentImage={photos[0] || NoImage}
                    apartmentPrice={price}
        />
        <div className="apartment-details-top">
            <div className="max-width-wrapper">
            </div>
            {userStore.user?.isSuperuser && <>
                <DeleteApartment apartmentId={apartmentId}/>
                <Button icon={UpdateIcon}
                        onClick={() => navigate(`/update-apartment/${apartmentId}`)}
                        title={"Обновить"}/>
            </>}


        </div>
        <div className="apartment-details-mid">
            <div className="apartment-details-wrapper">
                <div className="apartment-images">
                    <Slider loop
                            items={(!photos[0] ? [ImageNotFound] : photos).map(image =>
                                <SwiperSlide key={image}>
                                    <img src={image}
                                         alt=""></img>
                                </SwiperSlide>)}
                    />
                </div>
                <div className="apartment-tabs">

                    {[

                        {
                            title: t("Description"),
                            onClick: () => descriptionRef.current?.scrollIntoView()
                        }, {
                            title: t("Amenities"),
                            onClick: () => tagsRef.current?.scrollIntoView()
                        }, {
                            title: t("Rules Of Residence"),
                            onClick: () => rulesRef.current?.scrollIntoView()
                        }, {
                            title: t("Near The House"),
                            onClick: () => nearToApartmentRef.current?.scrollIntoView()
                        },
                        {
                            title: t("On Map"),
                            onClick: () => mapRef.current?.scrollIntoView()
                        },
                    ]
                        .map((tab, index) =>
                            <span className={clsx("apartment-tabs__tab", currentTab === index && "active")}
                                  onClick={() => {
                                      tab.onClick();
                                      setCurrentTab(index)
                                  }}>{tab.title}</span>)}
                </div>
                <div className="apartment-properties">
                    {/*TODO refactor*/}
                    <IconWithTwoTitles icon={RoomsIcon}
                                       title={roomQuantity}
                                       subTitle={tr("Room", {count: roomQuantity})}
                    />
                    <IconWithTwoTitles icon={BedIcon}
                                       title={sleepPlaces}
                                       subTitle={t("Sleep places")}
                    />
                    <IconWithTwoTitles icon={GuestsIcon}
                                       title={guestQuantity}
                                       subTitle={tr("Guest", {count: guestQuantity})}
                    />
                    <IconWithTwoTitles icon={ApartmentAreaIcon}
                                       title={area + " м²"}
                                       subTitle={t("Area")}
                    />
                </div>
                <div className="apartment-description"
                     ref={descriptionRef}>
                    <h2 className="apartment-description__title">{t("Description")}</h2>
                    <span className="apartment-description__description"
                          dangerouslySetInnerHTML={{__html: description}}
                    ></span>
                </div>
                <div className="house-description">
                    <h2 className="house-description__title">{t("House Description")}</h2>
                    <ul className="house-description-list">
                        {["Кирпичный дом", "Лифт", "Этаж: 2", "Этажей: 6"].map(li =>
                            <TitleWithIcon className={"house-description__item"}
                                           withLi
                                           key={li}
                                           icon={MarkIcon}
                            >
                                {li}
                            </TitleWithIcon>)}
                    </ul>
                </div>
                <div className="section amenities"
                     ref={tagsRef}>
                    <h2 className="amenities__title">{t("Amenities")}</h2>


                    {amenityGroups.map(amenityGroup =>
                        <div className="amenities-list-wrapper"
                             key={amenityGroup.name}>
                            <h3 className="amenities-list__title">{amenityGroup.name}</h3>
                            <ul className="amenities-list">

                                {amenityGroup.amenities.map(li =>
                                    <TitleWithIcon className={"tags-list__item amenities-list__item"}
                                                   withLi
                                                   key={li}

                                                   icon={MarkIcon}
                                    >
                                        {li}
                                    </TitleWithIcon>)}
                            </ul>
                        </div>
                    )}
                </div>
                <div className="section rules-of-residence"
                     ref={rulesRef}>
                    <h3 className="title">{t("Rules Of Residence")}</h3>
                    <ul className="tags-list">
                        {testItems}
                    </ul>
                </div>
                <div className="section near-the-house"
                     ref={nearToApartmentRef}>
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
                                onClick={() => setIsCollapsibleExpanded(true)}
                        >{t("Show More")}</button>}
                </div>
            </div>
            <div className="order-menu">

                <h2 className="order-menu__title"
                    title={apartmentId}
                    onClick={() => document.execCommand("copy")}
                    onCopy={(event) => {
                        event.preventDefault();
                        event.clipboardData && event.clipboardData.setData("text/plain", apartmentId);
                    }}>{title}</h2>
                <span className="order-menu__address">Независимости пр-т., 19, Минск</span>
                <LinkWithIcon className="order-menu__on-map-link"
                              icon={GeoIcon}
                              href={"/"}
                >На карте </LinkWithIcon>

                <div className="order-menu-prices">
                    <div className="price-option">
                        <span className="price">
                        {t("From")}
                            <span
                                className="price-option__price"
                            > {price.amount}{currencyToPostfixMap[price.currency]}. </span>
                         / {t("Day")}
                        </span>
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
