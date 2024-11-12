import {apartmentService} from "../../../../shared/api/apartment-service";
import {snackBarStore} from "../../../../shared/ui/snack-bar/snack-bar-store";
import {ValuesType} from "../ui/create-apartment-form";
import {Apartment} from "../../../../shared/api/types/apartment";
import {UUID} from "../../../../shared/api/types/uuid";


export async function createApartment(values: ValuesType, accessToken: string, navigateToCreatedApartment: (id: UUID) => void) {
    try {
        const newAmenityGroups = []

        for (const groupName in values.amenityGroups) {
            //@ts-ignore
            newAmenityGroups.push({name: groupName, amenities: values.amenityGroups[groupName]})
        }


        const newApartment: Apartment = await apartmentService.createApartment({
            title: values.title,
            area: values.area,
            amenityGroups: newAmenityGroups,
            tariff: values.tariff || "",
            address: values.address,
            description: values.description,
            guestQuantity: 0,
            roomQuantity: values.roomCount,
            adultPrice: 0,
            teenPrice: 0,
            kidPrice: 0,
            babyPrice: 0,
            petPrice: 0,
            draft: false,
            sleepPlaces: values.sleepPlaces,
        }, accessToken)

        if (values.photos) {
            const formData = new FormData();

            for (let i = 0; i < values.photos.length; i++) {
                formData.append("photos", values.photos[i]);
            }
            await apartmentService.updateApartmentPhotos(newApartment.id, formData, accessToken)
        }


        snackBarStore.showSnackBar("Квартира успешно создана");
        navigateToCreatedApartment(newApartment.id)
    } catch (err) {
        console.log(err)
    }
}