import './styles.scss';
import {observer} from "mobx-react";
import {orderModalStore} from "../model/order-modal-store";
import clsx from "clsx";
import {useTypedTranslation} from "../../../app/i18n/use-typed-translation";
import {SvgButton} from "../../../shared/ui/svg-button";
import CrossIcon from "../../../assets/images/cross.svg";
import {Price} from "../../../shared/api/types/price";
import {currencyToPostfixMap} from "../../../shared/lib/currency-to-postfix-map";
import {currencyStore} from "../../../features/select-currency";
import {useEffect, useState} from "react";
import {OrderApartmentForm} from "../../../features/APARTMENT/order-apartment";
import {UUID} from "../../../shared/api/types/uuid";
import {orderService} from "../../../shared/api/order-service";
import {UpdateApartmentPriceDto} from "../../../shared/api/types/update-apartment-price.dto";
import {createPortal} from "react-dom";

type PropsType = {
    apartmentImage: any,
    apartmentAddress: string,
    apartmentPrice: Price,
    apartmentId: UUID,
    apartmentMaxGuests: number
}

export const OrderModal = observer(({
                                        apartmentPrice,
                                        apartmentImage,
                                        apartmentAddress,
                                        apartmentId,
                                        apartmentMaxGuests
                                    }: PropsType) => {
    const {t} = useTypedTranslation();
    const [orderPrice, setOrderPrice] = useState<number>(apartmentPrice.amount);

    useEffect(() => {
    }, [currencyStore.currency]);

    return createPortal(
        <div className={clsx("order-modal", orderModalStore.isOpened && "opened")}
             aria-hidden={!orderModalStore.isOpened}
             onClick={orderModalStore.stopPropagationInModal}>
            <header className="order-modal-header">
                <h2 className="header__title">
                    {t("Book Apartment")}
                </h2>
                <SvgButton className={"order-modal-close"}
                           icon={CrossIcon}
                           onClick={() => orderModalStore.setIsOpened(false)}/>
            </header>
            <div className="order-modal-content">
                <OrderApartmentForm onCreateOrder={() => orderModalStore.setIsOpened(false)}
                                    updateApartmentPrice={(dto: UpdateApartmentPriceDto) => {
                                        orderService.calculateOrderPrice(dto).then((res) => {
                                            setOrderPrice(res.amount)
                                        }).catch(err => {
                                        })
                                    }}
                                    apartmentMaxGuests={apartmentMaxGuests}
                                    apartmentId={apartmentId}/>
                <div className="apartment-details">
                    <img className="apartment-details__image"
                         src={apartmentImage}
                         alt=""/>
                    <span className="apartment-details__address">{apartmentAddress}</span>
                    <span
                        className="apartment-details__price">{orderPrice}{currencyToPostfixMap[currencyStore.currency]}.</span>
                </div>
            </div>
        </div>, document.getElementById("root") as HTMLElement
    )
});
