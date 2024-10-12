import "./styles.scss";
import {Button} from "../../../../shared/ui/button";
import BinIcon from "../../../../assets/images/bin.svg";
import {useTypedTranslation} from "../../../../app/i18n/use-typed-translation";
import {apartmentService} from "../../../../shared/api/apartment-service.mocked";
import {useCookies} from "react-cookie";

type PropsType = {
    apartmentId: string;
}
//TODO move to features
export function DeleteApartment({apartmentId}: PropsType) {
    const {t} = useTypedTranslation();
    const [cookies] = useCookies(["ACCESS-TOKEN"]);

    return <Button className="delete-apartment-button" icon={BinIcon} onClick={() => {
        apartmentService.deleteApartment(apartmentId, cookies["ACCESS-TOKEN"]).catch(console.log)
    }} title={t("Delete")}/>
}