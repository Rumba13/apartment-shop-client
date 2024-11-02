import './styles.scss';
import {Link, useNavigate} from "react-router-dom";
import {useTypedTranslation} from "../../../app/i18n/use-typed-translation";
import clsx from "clsx";
import LogoImage from "../../../assets/images/mocked/logo.jpg"
import {CONSTANTS, SERVER_TYPE} from "../../../shared/lib/constants";

export type Props = {
    className?: string;
}

export function Logo({className}: Props) {
    const {t} = useTypedTranslation();
    const navigate = useNavigate();

    return <Link className={clsx("logo", className)}
                 to="/"
                 onDoubleClick={() => CONSTANTS.SERVER_TYPE === SERVER_TYPE.DEVELOPMENT && navigate("/dev")}>
        {/*<img className="logo__image" src={LogoImage} alt={t("Website Logo")}/>*/}
        Элит Тауэр
    </Link>
}
