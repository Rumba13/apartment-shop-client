import "./styles.scss";
import { FavoriteList } from "../../../widgets/favorite-list";
import { MinimalLayout } from "../../../widgets/layouts/minimal-layout";

export function FavoriteListPage() {

   return (
      <MinimalLayout className={"dev-page"}>
         <h2 className="page__title">Избранное</h2>
         <FavoriteList />
      </MinimalLayout>
   );
}
