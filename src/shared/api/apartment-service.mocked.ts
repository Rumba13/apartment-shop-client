import {Apartment} from "./types/apartment";
import {UUID} from "./types/uuid";
import {serverConnection} from "./server-connection.mocked";
import {Currency} from "./types/currency";

class ApartmentService {
    constructor() {
    }

    public async getApartmentById(apartmentId: UUID, resultCurrency:Currency): Promise<Apartment | null> {
        return (await serverConnection.get("apartments/" + apartmentId, {params: {resultCurrency}})).data as Apartment;
    }
}

export const apartmentService = new ApartmentService();