import {Tag} from "./types/tag";
import {Apartment} from "./types/apartment";
import {apartmentService} from "./apartment-service";
import {Range} from "./types/range";
import {inRange} from "../lib/in-range";
import {SortBy} from "./types/sort-by";

class SearchService {
    public async search(searchTags: Tag[], priceRange: Range, areaRange:Range,sortBy:SortBy): Promise<Apartment[]> {
        let apartments: Apartment[] = await apartmentService.loadAllApartments();
        apartments = apartments.filter(apartment => searchTags.every(tag => apartment.tags.includes(tag)));
        apartments = apartments.filter(apartment => inRange(priceRange, apartment.price.inBYN))
        apartments = apartments.filter(apartment => inRange(areaRange, apartment.areaInSquareMeters))

        apartments = apartments.sort((a1,a2) =>  {
            if(sortBy === "price:asc") {
                return a1.price.inBYN - a2.price.inBYN;
            }
            if(sortBy === "price:desc") {
                return a2.price.inBYN - a1.price.inBYN;
            }
            return 0;
        })
        return apartments
    }
}


export const searchService = new SearchService();