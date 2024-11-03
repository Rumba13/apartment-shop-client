import {Apartment} from "../../../shared/api/types/apartment";
import {action, makeObservable, observable, override} from "mobx";
import {LoadingStore} from "../../../shared/model/loading-store";
import {SearchDto} from "../../../shared/api/types/search.dto";
import {searchStore} from "../../../shared/api/search-store";
import {priceFilterStore} from "../../../features/FILTER/filter-by-price";
import {areaFilterStore} from "../../../features/FILTER/filter-by-area";
import {currencyStore} from "../../../features/select-currency";
import {sortByStore} from "../../../features/sort-by/model/sort-by-store";
import {guestsCountStore} from "../../../features/FILTER/filter-by-guests";
import {filterByDateStore} from "../../../features/FILTER/filter-by-date";

class ApartmentListStore extends LoadingStore {
    constructor() {
        super()
        makeObservable(this, {
            isLoading: override,
            setIsError: override,
            isError: override,
            setIsLoading: override,
            pageSize: observable,
            setTotalPages: action,
            setApartments: action,
            currentPage: observable,
            setCurrentPage: action,
            totalPages: observable,
            apartments: observable
        });
    }

    public apartments: Apartment[] | null = null;
    public currentPage: number = 1;
    public setCurrentPage = (property: number) => this.currentPage = property
    public readonly pageSize: number = 10;
    public totalPages: number = 1;
    public setTotalPages = (totalPages: number) => this.totalPages = totalPages

    public setApartments = (apartments: Apartment[]) => {
        this.apartments = apartments;
    };

    public async loadApartments(searchDto: SearchDto) {
        this.setIsLoading(true)
        const pagination = await searchStore.search(searchDto)

        this.setIsLoading(false)
        apartmentListStore.setApartments(pagination.content)
        apartmentListStore.setCurrentPage(pagination.pageNumber);
        apartmentListStore.setTotalPages(pagination.totalPages);
    }
}

export const apartmentListStore = new ApartmentListStore();