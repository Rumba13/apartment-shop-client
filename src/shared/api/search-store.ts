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
    public isSearchOnRequestCooldown: boolean = false;
    public searchCooldownTimer: any = 0; //TODO
    public isLoading: boolean = false;
    public setIsLoading = (isLoading: boolean) => this.isLoading = isLoading

    public setSearchOnCooldown = () => {
        clearTimeout(this.searchCooldownTimer);
        this.isSearchOnRequestCooldown = true;
        this.searchCooldownTimer = setTimeout(() => this.isSearchOnRequestCooldown = false, this._searchTimeout)
    }

    public async search(searchTags: Tag[], priceRange: Range, areaRange: Range, sortBy: SortBy, resultCurrency: Currency, dates: string[]): Promise<Apartment[] | null> {
        this.setIsLoading(true);

        console.log("range", searchTags)

        const paginationResult: Pagination<Apartment> = (await serverConnection.get("/apartments", {
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
                amenities: searchTags.length === 0 ? undefined : searchTags.join(", ")
            }
        })).data

        for (let i = 0; i < paginationResult.content.length; i++) {
            setPhotosAbsolutePath(paginationResult.content[i].photos);
        }

        this.setIsLoading(false);
        return paginationResult.content;
    }
}


export const searchStore = new SearchStore();