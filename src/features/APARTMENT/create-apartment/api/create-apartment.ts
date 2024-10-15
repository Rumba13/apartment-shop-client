import {FormikValues} from "formik";
import {UUID} from "../../../../shared/api/types/uuid";
import {Apartment} from "../../../../shared/api/types/apartment";
import {apartmentService} from "../../../../shared/api/apartment-service";
import {snackBarStore} from "../../../../shared/ui/snack-bar/snack-bar-store";

export async function createApartment(values: FormikValues, accessToken: string, navigateToCreatedApartment: (id: UUID) => void) {
    try {
        const newApartment: Apartment = await apartmentService.createApartment({
            title: values.title,
            area: values.area,
            amenities: [],
            address: values.address,
            price: {
                currency: "USD",
                amount: values.price
            },
            description: values.description,
            bedsQuantity: values.bedsQuantity,
            guestsQuantity: values.guestsQuantity,
            roomsQuantity: values.roomsQuantity,
            draft: false
        }, accessToken)
        snackBarStore.showSnackBar("Квартира успешно создана");
        navigateToCreatedApartment(newApartment.id)
    } catch (err) {
        console.log(err)
    }
}