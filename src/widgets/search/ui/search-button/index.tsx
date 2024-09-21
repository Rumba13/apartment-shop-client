import "./styles.scss";
import {UseTypedTranslation} from "../../../../app/i18n/use-typed-translation";
import {SvgIcon} from "../../../../shared/ui/svg-icon";
import SearchIcon from "../../../../assets/images/search.svg";

type PropsType = {}

export const SearchButton = ({}: PropsType) => {
    const {t} = UseTypedTranslation();

    return (
        <button className="search-button">
            <SvgIcon className="search-button__icon" icon={SearchIcon} asImage/>
            <span className="search-button__title">{t("Find")}</span>
        </button>
    )
}