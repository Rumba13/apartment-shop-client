import { serverConnection } from "./server-connection";
import { UUID } from "./types/uuid";
import { Currency } from "./types/currency";
import { Apartment } from "./types/apartment";
import { CreateApartmentDto } from "./types/create-apartment.dto";
import { BookDate } from "./types/book-date";
import { setPhotosAbsolutePath } from "../lib/set-photos-absolute-path";

class ApartmentService {
   constructor() {}

   public async getApartmentById(apartmentId: UUID, resultCurrency: Currency): Promise<Apartment> {
      const apartment = (
         await serverConnection.get("apartments/" + apartmentId, {
            params: { resultCurrency },
         })
      ).data as Apartment;

      setPhotosAbsolutePath(apartment.photos);

      return apartment;
   }

   public async createApartment(apartmentDto: CreateApartmentDto, accessUserJWT: string): Promise<Apartment> {
      return (
         await serverConnection.post("apartments", apartmentDto, {
            headers: {
               Authorization: "Bearer " + accessUserJWT,
            },
         })
      ).data;
   }

   public async deleteApartment(apartmentId: UUID, accessUserJWT: string) {
      return (
         await serverConnection.delete(`apartments/${apartmentId}`, {
            headers: {
               Authorization: "Bearer " + accessUserJWT,
            },
         })
      ).data;
   }

   public async updateApartment(apartmentId: UUID, apartment: CreateApartmentDto, accessUserJWT: string) {
      return (
         await serverConnection.patch(`apartments/${apartmentId}`, apartment, {
            headers: {
               Authorization: "Bearer " + accessUserJWT,
            },
         })
      ).data;
   }

   public async updateApartmentPhotos(apartmentId: UUID, photos: any, accessUserJWT: string) {
      return (
         await serverConnection.put(`apartments/${apartmentId}/photos`, photos, {
            headers: {
               "Authorization": "Bearer " + accessUserJWT,
               "Content-Type": "multipart/form-data",
            },
         })
      ).data;
   }

   public async getApartmentBookedDates(apartmentId: UUID, resultCurrency: Currency): Promise<BookDate[]> {
      return (await serverConnection.get(`apartments/${apartmentId}/booked-calendar-dates`, { params: { resultCurrency } })).data;
   }
}

export const apartmentService = new ApartmentService();
