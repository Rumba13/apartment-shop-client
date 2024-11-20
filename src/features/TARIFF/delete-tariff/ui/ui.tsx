import "./styles.scss";
import { UUID } from "../../../../shared/api/types/uuid";
import { snackBarStore } from "../../../../shared/ui/snack-bar/snack-bar-store";
import { useTypedTranslation } from "../../../../app/i18n/use-typed-translation";
import { useNavigate } from "react-router-dom";
import useLocalStorageState from "use-local-storage-state";
import { ConfirmModalOptions } from "../../../../shared/api/types/confirm-modal-options";
import { Button } from "../../../../shared/ui/button";
import BinIcon from "../../../../assets/images/bin.svg";
import { confirmModalStore } from "../../../../shared/ui/confirm-modal/confirm-modal-store";
import { tariffService } from "../../../../shared/api/tariff-service";

async function deleteTariff(tariffId: UUID, accessToken: string, onSuccess: Function) {
   try {
      await tariffService.deleteTariff(tariffId, accessToken);
      onSuccess();
      snackBarStore.showSnackBar("Тариф успешно удалён");
   } catch (err) {
      console.log(err);
   }
}

type PropsType = {
   tariffId: UUID;
};

export function DeleteTariff({ tariffId }: PropsType) {
   const { t } = useTypedTranslation();
   const navigate = useNavigate();
   const [accessToken] = useLocalStorageState<string>("ACCESS-TOKEN", {
      defaultValue: "",
   });

   const confirmOptions: ConfirmModalOptions = {
      description: t("Definitely delete tariff?"),
      confirmButtonText: t("Delete"),
   };

   return (
      <Button
         className="delete-tariff-button"
         icon={BinIcon}
         onClick={() =>
            confirmModalStore
               .askForConfirm(confirmOptions)
               .then(() => deleteTariff(tariffId, accessToken, () => navigate("/tariffs")))
               .catch(console.error)
         }
         title=""
      />
   );
}
