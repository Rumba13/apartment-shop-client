import './styles.scss';
import {useTypedTranslation} from "../../../app/i18n/use-typed-translation";
import {FilterByPrice} from "../../../features/filter-by-price";
import React from "react";
import {FilterBySpace} from "../../../features/filter-by-space";

export function Aside() {
    const{t} = useTypedTranslation();

 return (
     <aside className="aside">
         <span className="aside__title">{t("Filters")}</span>
         <FilterByPrice/>
         <FilterBySpace/>
     </aside>
 )
}
