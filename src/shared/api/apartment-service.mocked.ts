import {Apartment} from "./types/apartment";
import {UUID} from "./types/uuid";
import {serverConnection} from "./server-connection.mocked";
import {Currency} from "./types/currency";
import {CreateApartmentDto} from "./types/create-apartment.dto";

class ApartmentService {
    constructor() {
    }

    public async getApartmentById(apartmentId: UUID, resultCurrency: Currency): Promise<Apartment | null> {
        return (await serverConnection.get("apartments/" + apartmentId, {params: {resultCurrency}})).data as Apartment;
    }

    public async createApartment(apartmentDto: CreateApartmentDto, accessUserJWT: string) {
        return (await serverConnection.post("apartments", apartmentDto, {
            headers: {
                Authorization: "Bearer " + accessUserJWT
            }
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
}

export const apartmentService = new ApartmentService();