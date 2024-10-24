import {Apartment} from "./types/apartment";
import {UUID} from "./types/uuid";
import {serverConnection} from "./server-connection";
import {Currency} from "./types/currency";
import {CreateApartmentDto} from "./types/create-apartment.dto";
import {mapApartmentAmenities} from "../lib/map-apartment-amenities";

class ApartmentService {
    constructor() {
    }

    public async getApartmentById(apartmentId: UUID, resultCurrency: Currency): Promise<Apartment | null> {
        const apartment = (await serverConnection.get("apartments/" + apartmentId, {params: {resultCurrency}})).data;
        apartment.amenityGroups = mapApartmentAmenities(apartment.amenityGroups);
        return apartment as Apartment;
    }

    public async createApartment(apartmentDto: CreateApartmentDto, accessUserJWT: string): Promise<Apartment> {
        return (await serverConnection.post("apartments", apartmentDto, {
            headers: {
                Authorization: "Bearer " + accessUserJWT
            },
        })).data
    }

    public async deleteApartment(apartmentId: UUID, accessUserJWT: string) {
        return (await serverConnection.delete(`apartments/${apartmentId}`, {
            headers: {
                Authorization: "Bearer " + accessUserJWT
            }
        })).data
    }

    public async updateApartment(apartmentId: UUID, apartment: CreateApartmentDto, accessUserJWT: string) {
        return (await serverConnection.patch(`apartments/${apartmentId}`, apartment, {
            headers: {
                Authorization: "Bearer " + accessUserJWT
            }
        })).data
    }

    public async updateApartmentPhotos(apartmentId: UUID, photos: any, accessUserJWT: string) {
        return (await serverConnection.put(`apartments/${apartmentId}/photos`, photos, {
            headers: {
                Authorization: "Bearer " + accessUserJWT,
                "Content-Type": "multipart/form-data"
            }
        })).data
    }
}

export const apartmentService = new ApartmentService();