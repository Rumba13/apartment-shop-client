import "./styles.scss";
import {UUID} from "../../../../../shared/api/types/uuid";
import HeartIcon from "../../../../../assets/images/heart.svg";
import FilledHeartIcon from "../../../../../assets/images/heart-filled.svg";
import {useTypedTranslation} from "../../../../../app/i18n/use-typed-translation";
import {observer} from "mobx-react";
import {favoritesStore} from "../../model/favorites-store";
import {Button} from "../../../../../shared/ui/button";
import {snackBarStore} from "../../../../../shared/ui/snack-bar/snack-bar-store";
import {SvgButton} from "../../../../../shared/ui/svg-button";
import clsx from "clsx";

type PropsType = {
    apartmentId: UUID;
    variant?: "mini" | "medium",
}

export const AddApartmentToFavorites = observer(({apartmentId, variant = "medium"}: PropsType) => {
            const {t} = useTypedTranslation();

            const toggleInFavoriteList = () => {
                favoritesStore.toggleApartmentInFavorites(apartmentId)

                if (favoritesStore.favorites.includes(apartmentId)) {
                    snackBarStore.showSnackBar("Квартира добавлена в избранное", {timeout: 1100})
                }
            }

            let buttonIcon;
            let buttonTitle;
            let className;

            if (favoritesStore.favorites.includes(apartmentId)) {
                buttonIcon = FilledHeartIcon;
                buttonTitle = t("Saved")
                className = "active"
            } else {
                buttonIcon = HeartIcon
                buttonTitle = t("Save")
                className = ""
            }

            if (variant === "mini") {
                return <SvgButton
                    className={clsx("add-to-wish-list-button", "mini", className)} icon={buttonIcon} asImage={false}
                    onClick={toggleInFavoriteList}/>
            }

            if (favoritesStore.favorites.includes(apartmentId)) {
                return <Button
                    className={clsx("add-to-wish-list-button", className)}
                    icon={buttonIcon}
                    onClick={toggleInFavoriteList}
                    title={buttonTitle}
                />
            } else {
                return <Button
                    className="add-to-wish-list-button"
                    icon={buttonIcon}
                    onClick={toggleInFavoriteList}
                    title={buttonTitle}
                />
            }
        }
    )
;