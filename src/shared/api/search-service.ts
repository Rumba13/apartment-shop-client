import {Tag} from "./types/tag";
import {Apartment} from "./types/apartment";
import {apartmentService} from "./apartment-service";
import {Range} from "./types/range";
import {inRange} from "../lib/in-range";
import {SortBy} from "./types/sort-by";

class SearchService {
    private readonly _searchTimeout = 500;

    public isSearchOnRequestCooldown: boolean = false;
    public searchCooldownTimer:any = 0; //TODO

    public isLoading:boolean = false;
    public  setIsLoading = (isLoading:boolean) => this.isLoading = isLoading

    private setSearchOnCooldown = () => {
        clearTimeout(this.searchCooldownTimer);
        this.isSearchOnRequestCooldown = true;
        this.searchCooldownTimer = setTimeout(() => this.isSearchOnRequestCooldown = false, this._searchTimeout)
    }

    public async search(searchTags: Tag[], priceRange: Range, areaRange: Range, sortBy: SortBy): Promise<Apartment[] | null> {
        // if (this.isSearchOnRequestCooldown) {
        //     this.setSearchOnCooldown();
        //     return null
        // }
        // this.setSearchOnCooldown()
        this.setIsLoading(true);

        let apartments: Apartment[] = await apartmentService.loadAllApartments();
        apartments = apartments.filter(apartment => searchTags.every(tag => apartment.tags.includes(tag)));
        apartments = apartments.filter(apartment => inRange(priceRange, apartment.price.amount))
        apartments = apartments.filter(apartment => inRange(areaRange, apartment.areaInSquareMeters))

        apartments = apartments.sort((a1, a2) => {
            if (sortBy === "price:asc") {
                return a1.price.amount - a2.price.amount;
            }
            if (sortBy === "price:desc") {
                return a2.price.amount - a1.price.amount;
            }
            return 0;
        })

        return new Promise((resolve) => {
            // setTimeout(() => {
            resolve(apartments);
                 searchService.setIsLoading(false)
             //}, 200)
        })
    }
}


export const searchService = new SearchService();