import "./styles.scss";
import {Apartment} from "../../../shared/api/types/apartment";

type PropsType = {
    apartment: Apartment;
}

export function ApartmentCard({
                                  apartment: {
                                      title,
                                      guestsQuantity,
                                      bedsQuantity,
                                      roomsQuantity,
                                      photos,
                                      price,
                                      landlordId,
                                      addressId,
                                      description
                                  }
                              }: PropsType) {
    return <div className="apartment-card">
        <span className="apartment-card__price">{price.inBYN}</span>
    </div>
}