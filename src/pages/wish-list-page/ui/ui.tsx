import './styles.scss';
import {Header} from "../../../widgets/header";
import {UseTypedTranslation} from "../../../app/i18n/use-typed-translation";

export function WishListPage() {
 const {t} = UseTypedTranslation();

 return <div className="wish-list-page">
  <Header/>
   <h2 className="wish-list-page__title">{t("Featured")}</h2>
 </div>
}
