import {Tag} from "./types/tag";
import {Apartment} from "./types/apartment";
import {Range} from "./types/range";
import {SortBy} from "./types/sort-by";
import {serverConnection} from "./server-connection";
import {Pagination} from "./types/pagination";
import {Currency} from "./types/currency";
import {setPhotosAbsolutePath} from "../lib/set-photos-absolute-path";
import {SearchDto} from "./types/search.dto";

class SearchStore {
    private readonly _searchCooldownTime = 200;
    private readonly minimalSearchPendingTime = 200;
    private searchCooldownTimer: ReturnType<typeof setTimeout> | null = null;

    public isLoading: boolean = false;
    public setIsLoading = (isLoading: boolean) => this.isLoading = isLoading

    public isSearchOnCooldown: boolean = false;
    public setSearchOnCooldown = () => {
        this.searchCooldownTimer && clearTimeout(this.searchCooldownTimer);
        this.isSearchOnCooldown = true;
        this.searchCooldownTimer = setTimeout(() => this.isSearchOnCooldown = false, this._searchCooldownTime)
    }

//TODO refactor to searchDto
    public async search(searchDto: SearchDto): Promise<Pagination<Apartment>> {
        this.setIsLoading(true);

        const searchPromise = (serverConnection.get("/apartments", {params: searchDto}))

        const minimalSearchPendingTimePromise = new Promise<void>(resolve => setTimeout(resolve, this.minimalSearchPendingTime))

        const pagination: Pagination<Apartment> = (await Promise.all([minimalSearchPendingTimePromise, searchPromise]))[1].data

        for (let i = 0; i < pagination.content.length; i++) {
            setPhotosAbsolutePath(pagination.content[i].photos);
        }

        this.setIsLoading(false);
        return pagination;
    }
}


export const searchStore = new SearchStore();