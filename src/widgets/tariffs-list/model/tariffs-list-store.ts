import {makeObservable, override} from "mobx";
import {LoadingStore} from "../../../shared/model/loading-store";
import {Tariff} from "../../../shared/api/types/tariff";
import {tariffService} from "../../../shared/api/tariff-service";

class TariffsListStore extends LoadingStore {
    constructor() {
        super()
        makeObservable(this, {
            setIsLoading: override,
            isLoading: override,
            isError: override,
            setIsError: override
        })
    }

    public tariffs: Tariff[] | null = null;
    public setTariffs = (tariffs: Tariff[]) => this.tariffs = tariffs

    public async loadTariffs() {
        this.setIsLoading(true);

        try {
            const pagination = await tariffService.loadTariffs({page: 1, page_size: 10})
            this.setTariffs(pagination.content)
        } catch (err) {
            this.setIsError(true);
            console.error(err);
        }
        this.setIsLoading(false);
    }
}

export const tariffsListStore = new TariffsListStore()