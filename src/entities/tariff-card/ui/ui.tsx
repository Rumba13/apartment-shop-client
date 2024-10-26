import './styles.scss';
import {Tariff} from "../../../shared/api/types/tariff";

type PropsType = {
    tariff: Tariff,
    onClick?: () => void,
}

export function TariffCard({tariff,onClick}: PropsType) {

    return <div className="tariff-card" onClick={onClick}>
        <h2 className="tariff-card__title">{tariff.title}</h2>
    </div>
}
