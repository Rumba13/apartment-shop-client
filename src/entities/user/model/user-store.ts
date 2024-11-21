import { makeAutoObservable } from "mobx";
import { User } from "../../../shared/api/types/user";
import { authService } from "../../../shared/api/auth-service";

class UserStore {
   constructor() {
      makeAutoObservable(this);
   }

   public user: User | null = null;
   public setUser = (user: User | null) => (this.user = user);
   public isLoading: boolean = false;
   public setIsLoading = (isLoading: boolean) => (this.isLoading = isLoading);
   public isError: boolean = false;
   public setIsError = (isError: boolean) => (this.isError = isError);

   public async auth(accessToken: string | null, refreshToken: string | null, updateTokens: (accessToken: string, refreshToken: string) => void) {
      this.setIsLoading(true);
      this.setIsError(false);

      try {
         const user = await authService.auth(accessToken);
         this.setUser(user); //User by access_token
      } catch (err) {
         try {
            const refreshResponse = await authService.refresh(refreshToken); //User by refresh_token
            const user = await authService.auth(refreshResponse.access_token);
            this.setUser(user);
            updateTokens(refreshResponse.access_token, refreshResponse.refresh_token);
         } catch (err) {
            //no user
            this.setIsError(true);
            // this.setUser(null);
            updateTokens("", "");
         }
      } finally {
         this.setIsLoading(false);
      }
   }
}

export const userStore = new UserStore();
