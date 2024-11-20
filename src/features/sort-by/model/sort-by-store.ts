import { makeAutoObservable } from "mobx";
import { SortBy } from "../../../shared/api/types/sort-by";

class SortByStore {
   constructor() {
      makeAutoObservable(this);
   }

   public selectedSortBy: SortBy = "price:asc";
   public setSelectedSortBy = (sortBy: SortBy) => (this.selectedSortBy = sortBy);
}

export const sortByStore = new SortByStore();
