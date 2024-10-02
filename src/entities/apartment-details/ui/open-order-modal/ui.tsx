import "./styles.scss"
import {Button} from "../../../../shared/ui/button";
import OrderIcon from "../../../../assets/images/text-bubble.svg";
import {useTypedTranslation} from "../../../../app/i18n/use-typed-translation";
import {orderModalStore} from "../../../../widgets/order-modal/model/order-modal-store";

export function OpenOrderModalButton() {
    const {t} = useTypedTranslation();

    return (
        <Button className="open-order-modal-button" icon={OrderIcon} onClick={() => orderModalStore.setIsOpened(true)}
                title={t("Leave Request")}/>
    )
}