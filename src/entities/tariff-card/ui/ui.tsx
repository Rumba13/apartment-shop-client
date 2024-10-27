import './styles.scss';
import {DeleteTariff} from "../../../features/TARIFF/delete-tariff";
import {TariffShort} from "../../../shared/api/types/tariff-short";
import clsx from "clsx";

type PropsType = {
    tariff: TariffShort,
    onClick?: () => void,
    isActive: boolean
}

export function TariffCard({tariff, onClick, isActive}: PropsType) {
    return <div className={clsx("tariff-card", isActive && "selected")}
                onClick={onClick}>
        <DeleteTariff tariffId={tariff.id}/>
        <h2 className="tariff-card__title">{tariff.title}</h2>
    </div>
}
