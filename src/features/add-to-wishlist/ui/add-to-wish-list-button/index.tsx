import "./styles.scss";
import {UUID} from "../../../../shared/api/types/uuid";
import HeartIcon from "../../../../assets/images/heart.svg";
import {useTypedTranslation} from "../../../../app/i18n/use-typed-translation";
import {observer} from "mobx-react";
import {wishListStore} from "../../model/wish-list-store";
import {Button} from "../../../../shared/ui/button";

type PropsType = {
    apartmentId: UUID;
}

export const AddToWishListButton = observer(({apartmentId}: PropsType) => {
    const {t} = useTypedTranslation();

    return <Button
        className={"add-to-wish-list-button"}
        icon={HeartIcon}
        onClick={() => wishListStore.toggleApartmentWishList(apartmentId)}
        title={t("Save")}
    />
});