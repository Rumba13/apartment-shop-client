import './styles.scss';
import {Link} from "react-router-dom";
import {UseTypedTranslation} from "../../../app/i18n/use-typed-translation";
import clsx from "clsx";

export type Props = {
    className?: string;
}

export function Logo({className}: Props) {
    const {t} = UseTypedTranslation();

    return <Link className={clsx("logo", className)} to="/">
        <img className="logo__image" src="../../../assets/images/mocked/logo.png" alt={t("Website Logo")}/>
    </Link>
}
