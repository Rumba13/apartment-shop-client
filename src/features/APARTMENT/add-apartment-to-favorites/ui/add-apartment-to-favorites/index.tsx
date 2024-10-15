import "./styles.scss";
import {UUID} from "../../../../../shared/api/types/uuid";
import HeartIcon from "../../../../../assets/images/heart.svg";
import {useTypedTranslation} from "../../../../../app/i18n/use-typed-translation";
import {observer} from "mobx-react";
import {favoritesStore} from "../../model/favorites-store";
import {Button} from "../../../../../shared/ui/button";

type PropsType = {
    apartmentId: UUID;
}

export const AddApartmentToFavorites = observer(({apartmentId}: PropsType) => {
    const {t} = useTypedTranslation();

    return <Button
        className={"add-to-wish-list-button"}
        icon={HeartIcon}
        onClick={() => favoritesStore.toggleApartmentInFavorites(apartmentId)}
        title={t("Save")}
    />
});