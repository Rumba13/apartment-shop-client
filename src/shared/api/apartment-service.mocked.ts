import {Apartment} from "./types/apartment";
import {UUID} from "./types/uuid";
import {serverConnection} from "./server-connection.mocked";
import {Pagination} from "./types/pagination";

class ApartmentService {
    constructor() {
    }

    public async getApartmentById(apartmentId: UUID): Promise<Apartment | null> {
        return null;
    }

    public async getAllApartments(): Promise<Pagination<Apartment>> {
        try {
            const paginationResult = (await serverConnection.get("apartments")).data as Pagination<Apartment>;
            paginationResult.content.forEach(apartment => apartment.price.amount = Number.parseFloat(apartment.price.amount as unknown as string));

            return paginationResult;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
}

export const apartmentService = new ApartmentService();