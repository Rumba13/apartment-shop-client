import {LoadTariffsDto} from "./types/load-tariffs.dto";
import {serverConnection} from "./server-connection";
import {Pagination} from "./types/pagination";
import {Tariff} from "./types/tariff";
import {UUID} from "./types/uuid";

class TariffService {
    constructor() {
    }

    public async loadTariffs(loadTariffsDto: LoadTariffsDto):Promise<Pagination<Tariff>> {
        return (await serverConnection.get("/tariffs", {params: loadTariffsDto})).data
    }
    public async loadTariff(tariffId:UUID):Promise<Tariff> {
        return (await serverConnection.get("/tariffs/" + tariffId)).data
    }
}

export const tariffService = new TariffService()