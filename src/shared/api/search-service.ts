import {Tag} from "./types/tag";
import {Apartment} from "./types/apartment";
import {apartmentService} from "./apartment-service.mocked";
import {Range} from "./types/range";
import {inRange} from "../lib/in-range";
import {SortBy} from "./types/sort-by";
import {serverConnection} from "./server-connection.mocked";
import {Pagination} from "./types/pagination";
import {Currency} from "./types/currency";

class SearchService {
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

    public async search(searchTags: Tag[], priceRange: Range, areaRange: Range, sortBy: SortBy, resultCurrency:Currency): Promise<Apartment[] | null> {
        this.setIsLoading(true);

        const paginationResult:Pagination<Apartment> = (await serverConnection.get("/apartments", {
            params: {
                pageSize: 20,
                page: 1,
                minPrice: priceRange.min,
                maxPrice: priceRange.max,
                minSquare: areaRange.min,
                maxSquare: areaRange.max,
                sortBy,
                resultCurrency: resultCurrency,
                amenities: searchTags.join(", ")
            }
        })).data

        this.setIsLoading(false);
        return paginationResult.content;
    }
}


export const searchService = new SearchService();