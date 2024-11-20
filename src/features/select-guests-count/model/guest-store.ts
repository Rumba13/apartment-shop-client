import { makeAutoObservable } from "mobx";

class GuestStore {
   constructor() {
      makeAutoObservable(this);
   }
   private readonly guestsCountMax = 16;
   private readonly guestsCountMin = 1;

   public guestsCount: number = this.guestsCountMin;
   public setGuestsCount = (count: number) => {
      if (count < this.guestsCountMin || count > this.guestsCountMax) {
         return console.log("Guests count mismatch: ", count);
      }

      this.guestsCount = count;
   };
}

export const guestStore = new GuestStore();
