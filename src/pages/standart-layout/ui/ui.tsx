import './styles.scss';
import clsx from "clsx";
import {Header} from "../../../widgets/header";
import {Aside} from "../../../widgets/aside";
import React from "react";
import {observer} from "mobx-react";
import {apartmentListStore} from "../../../widgets/apartment-list/model/apartment-list-store";

type PropsType = {
    className?: string,
    children: React.ReactNode,
    noAside?: boolean,
    withTitle?: boolean,
}

export const StandartLayout = observer(({className, children, noAside = false, withTitle = false}: PropsType) => {

    const paginationDetails = `${(apartmentListStore.currentPage * apartmentListStore.pageSize) - apartmentListStore.pageSize + 1}-${apartmentListStore.currentPage * apartmentListStore.pageSize} из ${apartmentListStore.totalPages * apartmentListStore.pageSize}`

    return (
        <div className={clsx("standart-layout", className)}>
            <Header/>
            {withTitle && <div className="sub-header">
                <h1 className="home-page__title">Квартиры на сутки в Гомеле</h1>
                <span className="home-page__pagination-details">{paginationDetails}</span>
            </div>}

            <div className="standart-layout-wrapper">

                {!noAside && <Aside/>}
                <div className="content">{children}</div>
            </div>
        </div>
    )
})
