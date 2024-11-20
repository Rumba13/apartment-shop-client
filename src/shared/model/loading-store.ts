import { action, makeObservable, observable } from "mobx";

export class LoadingStore {
   constructor() {
      makeObservable(this, {
         isLoading: observable,
         isError: observable,
         setIsError: action,
         setIsLoading: action,
      });
   }

   public isError: boolean = false;
   public setIsError = (isError: boolean) => (this.isError = isError);

   public isLoading: boolean = false;
   public setIsLoading = (isLoading: boolean) => (this.isLoading = isLoading);
}
