import "./styles.scss"
import {useTypedTranslation} from "../../../../app/i18n/use-typed-translation";
import {AdminButton} from "../../../../shared/ui/admin-button";
import {useNavigate} from "react-router-dom";

export function OpenCreateApartmentPageButton() {
    const {t} = useTypedTranslation();
    const navigate = useNavigate();

    return <AdminButton className="open-create-apartment-page-button"
                        onClick={() => navigate("create-apartment")}
                        title={t("Create Apartment")}/>
}
