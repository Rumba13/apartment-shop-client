import {FormikValues} from "formik";
import {UUID} from "../../../../shared/api/types/uuid";
import {apartmentService} from "../../../../shared/api/apartment-service";
import {currencyStore} from "../../../select-currency";
import {snackBarStore} from "../../../../shared/ui/snack-bar/snack-bar-store";

export async function updateApartment(values: FormikValues, accessToken: string, apartmentId: UUID, navigateToUpdatedApartment: (id: UUID) => void) {
    try {
        await apartmentService.updateApartment(apartmentId, {
            title: values.title,
            area: values.area,
            amenities: values.amenities.split(", "),
            address: values.address,
            price: {
                currency: currencyStore.currency,
                amount: values.price
            },
            description: values.description,
            bedsQuantity: values.bedsQuantity,
            guestsQuantity: values.guestsQuantity,
            roomsQuantity: values.roomsQuantity,
            draft: false
        }, accessToken)

        if (values.photo) {
            const formData = new FormData();

            for (let i = 0; i < values.photo.length; i++) {
                formData.append("photos", values.photo[i]);
            }
            await apartmentService.updateApartmentPhotos(apartmentId, formData, accessToken)
        }

        navigateToUpdatedApartment(apartmentId);
        snackBarStore.showSnackBar("Квартира обновлена успешно")
    } catch (err) {
        console.log(err)
    }
}