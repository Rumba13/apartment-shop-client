import "./styles.scss";
import { FavoriteList } from "../../../widgets/favorite-list";
import { MinimalLayout } from "../../../widgets/layouts/minimal-layout";
import { favoriteListStore } from "../../../widgets/favorite-list/model/favorite-list-store";
import { favoritesStore } from "../../../features/APARTMENT/add-apartment-to-favorites/model/favorites-store";

export function FavoriteListPage() {
   return (
      <MinimalLayout className={"dev-page"}>
         <h2 className="page__title">Избранное</h2>
         <FavoriteList favoriteListStore={favoriteListStore} favoritesStore={favoritesStore} />
      </MinimalLayout>
   );
}
