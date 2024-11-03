import {LoadingStore} from "../../../../shared/model/loading-store";
import {makeObservable, override} from "mobx";
import {filtersBoundsService} from "../../../../shared/api/filters-bounds-service";
import {Currency} from "../../../../shared/api/types/currency";
import {FilterBounds} from "../../../../shared/api/types/filters-bounds";

class FilterBoundsStore extends LoadingStore {
    constructor() {
        super();
        makeObservable(this, {
            isLoading: override,
            setIsError: override,
            isError: override,
            setIsLoading: override
        })
    }

    public async loadFilterBounds(resultCurrency:Currency):Promise<FilterBounds> {
        this.setIsLoading(true);

        try {
           return await filtersBoundsService.loadFiltersBound(resultCurrency)
        } catch (err) {
            this.setIsError(true);
            console.log(err)
            throw err;
        } finally {
            this.setIsLoading(false);
        }
    }
}

export const filterBoundsStore = new FilterBoundsStore()