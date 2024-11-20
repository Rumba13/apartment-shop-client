import { UUID } from "./types/uuid";

class AddressService {
   public async getAddressByUUID(uuid: UUID): Promise<string> {
      return "Независимости пр-т., 19";
   }
}

export const addressService = new AddressService();
