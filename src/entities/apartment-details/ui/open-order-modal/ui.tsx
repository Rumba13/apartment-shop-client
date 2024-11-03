import "./styles.scss"
import {Button} from "../../../../shared/ui/button";
import OrderIcon from "../../../../assets/images/text-bubble.svg";
import {useTypedTranslation} from "../../../../app/i18n/use-typed-translation";
import {orderModalStore} from "../../../../widgets/order-modal";
import {Link} from "react-router-dom";
import {UUID} from "../../../../shared/api/types/uuid";

type PropsType = {
    apartmentId:UUID
}

export function OpenOrderModalButton({apartmentId}:PropsType) {
    const {t} = useTypedTranslation();

    return (
        <Link to={`/order/${apartmentId}`}>

        <Button className="open-order-modal-button" icon={OrderIcon} onClick={() => {}}
                title={t("Leave Request")}/>
        </Link>
    )
}