import {Tag} from "./types/tag";
import {Apartment} from "./types/apartment";
import {apartmentService} from "./apartment-service";
import {Range} from "./types/range";
import {inRange} from "../lib/in-range";

class SearchService {
    public async search(searchTags: Tag[], priceRange: Range, areaRange:Range): Promise<Apartment[]> {
        let apartments: Apartment[] = await apartmentService.loadAllApartments();
        apartments = apartments.filter(apartment => searchTags.every(tag => apartment.tags.includes(tag)));
        apartments = apartments.filter(apartment => inRange(priceRange, apartment.price.inBYN))
        apartments = apartments.filter(apartment => inRange(areaRange, apartment.areaInSquareMeters))
        return apartments
    }
}

export const searchService = new SearchService();