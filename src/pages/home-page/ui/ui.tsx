import "./styles.scss"
import {StandartLayout} from "../../standart-layout";
import {ApartmentList} from "../../../widgets/apartment-list";
import {SortBy} from "../../../features/sort-by";
import {OpenCreateApartmentPageButton} from "./open-create-apartment-page-button";
import {userStore} from "../../../entities/user";
import React, {useEffect, useRef} from "react";
import {observer} from "mobx-react";
import {Pagination} from "antd";
import {apartmentListStore} from "../../../widgets/apartment-list/model/apartment-list-store";
import {SelectDatesModal, selectDatesModalStore} from "../../../widgets/welcome-modal";
import {selectGuestModalStore, SelectGuestsModal} from "../../../widgets/select-guests-modal";
import {guestsCountStore} from "../../../features/FILTER/filter-by-guests";
import {filterByDateStore} from "../../../features/FILTER/filter-by-date";

export const HomePage = observer(() => {
    const paginationDetails = `${(apartmentListStore.currentPage * apartmentListStore.pageSize) - apartmentListStore.pageSize + 1}-${apartmentListStore.currentPage * apartmentListStore.pageSize} из ${apartmentListStore.totalPages * apartmentListStore.pageSize}`

    useEffect(() => {
        if (!filterByDateStore.isTouched) {
            selectDatesModalStore.open()
        }
    }, [userStore.user]);

    const scrollToRef = useRef<HTMLDivElement>(null);

    return <StandartLayout className="home-page"
                           withTitle>
        <SelectDatesModal onNextButtonClick={() => {
            selectDatesModalStore.close()
            selectGuestModalStore.open()
        }}/>
        <SelectGuestsModal onNextButtonClick={(guests) => {
            guestsCountStore.setMinGuestsCount(guests.adultCount + guests.babyCount + guests.teenCount + guests.kidCount)
        }}/>

        <div className="home-page-top"
             ref={scrollToRef}>
            <span className="home-page__pagination-details">{paginationDetails}</span>
            {userStore.user?.isSuperuser && <OpenCreateApartmentPageButton/>}
            <SortBy/>
        </div>
        <ApartmentList/>

        {apartmentListStore.totalPages > 1 && <Pagination className="pagination"
                                                          align="center"
                                                          pageSize={apartmentListStore.pageSize}
                                                          current={apartmentListStore.currentPage}
                                                          total={apartmentListStore.totalPages * apartmentListStore.pageSize}
                                                          onChange={(currentPage) => {
                                                              apartmentListStore.setCurrentPage(currentPage)
                                                              scrollToRef.current?.scrollIntoView({
                                                                  //@ts-ignore
                                                                  behavior: "instant",
                                                                  block: "nearest"
                                                              })
                                                          }}/>}
    </StandartLayout>
});