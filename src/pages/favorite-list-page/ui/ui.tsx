import './styles.scss';
import {MinimalLayout} from "../../minimal-layout";
import React, {useEffect} from "react";
import {favoritesStore} from "../../../features/APARTMENT/add-apartment-to-favorites/model/favorites-store";
import {FavoriteList} from "../../../widgets/favorite-list";
import {useTypedTranslation} from "../../../app/i18n/use-typed-translation";

export function FavoriteListPage() {

    const {t} = useTypedTranslation();

    useEffect(() => {
    }, []);

    return (
        <MinimalLayout className={"dev-page"}>
            <h2 className="page__title">Избранное</h2>
            <FavoriteList favoriteApartmentIds={favoritesStore.favorites}/>
        </MinimalLayout>
    )
}
