import {LoadTariffsDto} from "./types/load-tariffs.dto";
import {serverConnection} from "./server-connection";
import {Pagination} from "./types/pagination";
import {Tariff} from "./types/tariff";
import {UUID} from "./types/uuid";
import {TariffShort} from "./types/tariff-short";
import {CreateTariffDto} from "./types/create-tariff.dto";

class TariffService {
    constructor() {
    }

    public async loadTariffs(): Promise<TariffShort[]> {
        return (await serverConnection.get("/tariffs/minimal",)).data
    }

    public async loadTariff(tariffId: UUID): Promise<Tariff> {
        return (await serverConnection.get("/tariffs/" + tariffId)).data
    }

    public async deleteTariff(tariffId: UUID, accessToken: UUID): Promise<Tariff> {
        return (await serverConnection.delete("/tariffs/" + tariffId, {
            headers: {
                Authorization: "Bearer " + accessToken
            }
        })).data
    }

    public async createTariff(createTariffDto: CreateTariffDto, accessToken: UUID): Promise<Tariff> {
        return (await serverConnection.post("/tariffs",createTariffDto ,{
            headers: {
                Authorization: "Bearer " + accessToken
            }
        })).data
    }

    public async updateTariff(updateTariffDto: CreateTariffDto, tariffId: UUID, accessToken: UUID): Promise<Tariff> {
        return (await serverConnection.patch("/tariffs/" + tariffId,updateTariffDto ,{
            headers: {
                Authorization: "Bearer " + accessToken
            }
        })).data
    }

}

export const tariffService = new TariffService()