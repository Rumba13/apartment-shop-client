import './styles.scss';
import {Header} from "../../../widgets/header";
import {useTypedTranslation} from "../../../app/i18n/use-typed-translation";

export function WishListPage() {
 const {t} = useTypedTranslation();

 return <div className="wish-list-page">
  <Header/>
   <h2 className="wish-list-page__title">{t("Featured")}</h2>
 </div>
}
