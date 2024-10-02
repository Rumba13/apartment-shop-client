import "./styles.scss"
import {useTypedTranslation} from "../../../../app/i18n/use-typed-translation";
import {Link} from "react-router-dom";

export function OpenCreateApartmentPageButton() {
    const {t} = useTypedTranslation();

    return <Link className="open-create-apartment-page-button"
                 to={"create-apartment"}>{t("Create Apartment")}</Link>
}
