import "./styles.scss"
import {Button} from "../../../../shared/ui/button";
import OrderIcon from "../../../../assets/images/text-bubble.svg";
import {useTypedTranslation} from "../../../../app/i18n/use-typed-translation";

export function OpenOrderModalButton() {
    const {t} = useTypedTranslation();

    return (
        <Button className="open-order-modal-button" icon={OrderIcon} onClick={() => {
        }} title={t("Leave Request")}/>
    )
}