import {Tag} from "./types/tag";
import {Apartment} from "./types/apartment";
import {Range} from "./types/range";
import {SortBy} from "./types/sort-by";
import {serverConnection} from "./server-connection";
import {Pagination} from "./types/pagination";
import {Currency} from "./types/currency";
import {setPhotosAbsolutePath} from "../lib/set-photos-absolute-path";

class SearchStore {
    private readonly _searchTimeout = 200;
    private readonly minimalSearchPendingTime = 200;
    private searchCooldownTimer: ReturnType<typeof setTimeout> | null = null;

    public isLoading: boolean = false;
    public setIsLoading = (isLoading: boolean) => this.isLoading = isLoading

    public isSearchOnRequestCooldown: boolean = false;
    public setSearchOnCooldown = () => {
        this.searchCooldownTimer && clearTimeout(this.searchCooldownTimer);
        this.isSearchOnRequestCooldown = true;
        this.searchCooldownTimer = setTimeout(() => this.isSearchOnRequestCooldown = false, this._searchTimeout)
    }
//TODO refactor to searchDto
    public async search(searchTags: Tag[], priceRange: Range, areaRange: Range, sortBy: SortBy, resultCurrency: Currency,maxGuestsCount:number, dates: (string | null)[]): Promise<Apartment[] | null> {
        this.setIsLoading(true);

        const searchPromise = (serverConnection.get("/apartments", {
            params: {
                pageSize: 20,
                page: 1,
                minPrice: priceRange.min,
                maxPrice: priceRange.max,
                minArea: areaRange.min,
                maxArea: areaRange.max,
                sortBy,
                resultCurrency: resultCurrency,
                fromDate: dates[0] || undefined,
                toDate: dates[1] || undefined,
                amenities: searchTags.length === 0 ? undefined : searchTags.join(", "),
                // maxGuestsQuantity: maxGuestsCount,
                // minGuestsQuantity: 0
            }
        }))

        const minimalSearchPendingTimePromise = new Promise<void>(resolve => setTimeout(resolve, this.minimalSearchPendingTime))

        const pagination: Pagination<Apartment> = (await Promise.all([minimalSearchPendingTimePromise, searchPromise]))[1].data

        for (let i = 0; i < pagination.content.length; i++) {
            setPhotosAbsolutePath(pagination.content[i].photos);
        }

        this.setIsLoading(false);
        return pagination.content;
    }
}


export const searchStore = new SearchStore();