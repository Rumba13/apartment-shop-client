import { FormikValues } from "formik";
import { UUID } from "../../../../shared/api/types/uuid";
import { apartmentService } from "../../../../shared/api/apartment-service";
import { currencyStore } from "../../../select-currency";
import { snackBarStore } from "../../../../shared/ui/snack-bar/snack-bar-store";

export async function updateApartment(values: FormikValues, accessToken: string, apartmentId: UUID, navigateToUpdatedApartment: (id: UUID) => void) {
   try {
      await apartmentService.updateApartment(
         apartmentId,
         {
            title: values.title,
            area: values.area,
            tariff: "",
            amenityGroups: [],
            address: values.address,
            description: values.description,
            guestQuantity: values.guestsQuantity,
            roomQuantity: values.roomsQuantity,
            adultPrice: 0,
            teenPrice: 0,
            kidPrice: 0,
            babyPrice: 0,
            petPrice: 0,
            sleepPlaces: "",
            draft: false,
         },
         accessToken
      );

      if (values.photo) {
         const formData = new FormData();

         for (let i = 0; i < values.photo.length; i++) {
            formData.append("photos", values.photo[i]);
         }
         await apartmentService.updateApartmentPhotos(apartmentId, formData, accessToken);
      }

      navigateToUpdatedApartment(apartmentId);
      snackBarStore.showSnackBar("Квартира обновлена успешно");
   } catch (err) {
      console.log(err);
   }
}
