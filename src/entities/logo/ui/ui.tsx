import './styles.scss';
import {Link} from "react-router-dom";
import {UseTypedTranslation} from "../../../app/i18n/use-typed-translation";
import clsx from "clsx";
import LogoImage from "../../../assets/images/mocked/logo.png"

export type Props = {
    className?: string;
}

export function Logo({className}: Props) {
    const {t} = UseTypedTranslation();

    return <Link className={clsx("logo", className)} to="/">
        <img className="logo__image" src={LogoImage} alt={t("Website Logo")}/>
    </Link>
}
