import "./styles.scss";
import React, { useEffect } from "react";
import { FavoriteList } from "../../../widgets/favorite-list";
import { useTypedTranslation } from "../../../app/i18n/use-typed-translation";
import { MinimalLayout } from "../../../widgets/layouts/minimal-layout";

export function FavoriteListPage() {
   const { t } = useTypedTranslation();

   useEffect(() => {}, []);

   return (
      <MinimalLayout className={"dev-page"}>
         <h2 className="page__title">Избранное</h2>
         <FavoriteList />
      </MinimalLayout>
   );
}
