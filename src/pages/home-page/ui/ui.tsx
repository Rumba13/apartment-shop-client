import "./styles.scss"
import {StandartLayout} from "../../standart-layout";
import {ApartmentList} from "../../../widgets/apartment-list";
import {SortBy} from "../../../features/sort-by";
import {OpenCreateApartmentPageButton} from "./open-create-apartment-page-button";
import {userStore} from "../../../entities/user";
import {useEffect, useRef} from "react";
import {observer} from "mobx-react";
import {Pagination} from "antd";
import {apartmentListStore} from "../../../widgets/apartment-list/model/apartment-list-store";

export const HomePage = observer(() => {
    useEffect(() => {
    }, [userStore.user]);

    const scrollToRef = useRef<HTMLDivElement>(null);

    return <StandartLayout className="home-page"
                           withTitle>
        <div className="home-page-top"
             ref={scrollToRef}>
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
                                                              console.log(scrollToRef.current)
                                                              apartmentListStore.setCurrentPage(currentPage)
                                                              scrollToRef.current?.scrollIntoView({
                                                              //@ts-ignore
                                                                  behavior: "instant",
                                                                  block: "nearest"
                                                              })
                                                          }}/>}


    </StandartLayout>
});