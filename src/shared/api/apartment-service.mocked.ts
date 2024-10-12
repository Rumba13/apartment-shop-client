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

    public async createApartment(apartment: CreateApartmentDto, accessUserJWT: string) {
        await serverConnection.post("apartments", apartment, {
            headers: {
                Authorization: `bearer ${accessUserJWT}`
            }
        })
    }
}

export const apartmentService = new ApartmentService();