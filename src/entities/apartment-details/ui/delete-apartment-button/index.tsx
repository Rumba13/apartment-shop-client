import "./styles.scss";
import {Button} from "../../../../shared/ui/button";
import BinIcon from "../../../../assets/images/bin.svg";
import {useTypedTranslation} from "../../../../app/i18n/use-typed-translation";
import {apartmentService} from "../../../../shared/api/apartment-service";
import {useCookies} from "react-cookie";
import {UUID} from "../../../../shared/api/types/uuid";
import {useNavigate} from "react-router-dom";
import {snackBarStore} from "../../../../shared/ui/snack-bar/snack-bar-store";

type PropsType = {
    apartmentId: string;
}

//TODO move to features

async function deleteApartment(apartmentId: UUID, accessToken: string, navigateToHome:Function) {
    try {
        await apartmentService.deleteApartment(apartmentId, accessToken)
        navigateToHome()
        snackBarStore.showSnackBar("Квартира успешно удалена")
    } catch (err) {
        console.log(err)
    }
}

export function DeleteApartment({apartmentId}: PropsType) {
    const {t} = useTypedTranslation();
    const navigate = useNavigate()
    const [cookies] = useCookies(["ACCESS-TOKEN"]);

    return <Button className="delete-apartment-button" icon={BinIcon} onClick={() => {
        deleteApartment(apartmentId, cookies["ACCESS-TOKEN"], () => navigate("/"))
    }} title={t("Delete")}/>
}