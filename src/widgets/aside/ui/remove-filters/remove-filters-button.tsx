import "./styles.scss";
import { SvgIcon } from "../../../../shared/ui/svg-icon";
import ResetIcon from "../../../../assets/images/refresh.svg";
import { useTypedTranslation } from "../../../../app/i18n/use-typed-translation";

type PropsType = {
   onClick?: () => void;
};

export function RemoveFiltersButton({ onClick }: PropsType) {
   const { t } = useTypedTranslation();

   return (
      <button className="remove-filters-button" onClick={onClick}>
         <SvgIcon icon={ResetIcon} asImage />
         <span className="remove-filters-button__title">{t("Remove Filters")}</span>
      </button>
   );
}
