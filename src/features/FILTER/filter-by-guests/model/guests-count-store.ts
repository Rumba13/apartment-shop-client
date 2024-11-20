import { makeAutoObservable } from "mobx";

class GuestsCountStore {
   constructor() {
      makeAutoObservable(this);
   }

   public readonly minGuestsCountBound = 0;

   public minGuestsCount: number = 0;
   public setMinGuestsCount = (value: number) => (this.minGuestsCount = value);

   public maxGuestsCount: number = 0;
   public setMaxGuestsCount = (value: number) => (this.maxGuestsCount = value);

   public removeFilter = () => {
      this.setMaxGuestsCount(0);
      this.setMinGuestsCount(0);
   };
}

export const guestsCountStore = new GuestsCountStore();
