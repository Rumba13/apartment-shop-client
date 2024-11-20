import { action, makeObservable, observable } from "mobx";

export class AnimationManagerStore {
   constructor() {
      makeObservable(this, {
         isAnimating: observable,
         setIsAnimating: action,
      });
   }

   public isAnimating: boolean = false;
   public setIsAnimating = (isAnimating: boolean) => (this.isAnimating = isAnimating);
}
