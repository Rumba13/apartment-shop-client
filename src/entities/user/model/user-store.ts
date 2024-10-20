import {makeAutoObservable} from "mobx";
import {User} from "../../../shared/api/types/user";
import {authService} from "../../../shared/api/auth-service";

class UserStore {
    constructor() {
        makeAutoObservable(this)
    }

    public user: User | null = null;
    public setUser = (user: User | null) => this.user = user
    public isLoading: boolean = false;
    public setIsLoading = (isLoading: boolean) => this.isLoading = isLoading
    public isError: boolean = false;
    public setIsError = (isError: boolean) => this.isError = isError

    public async auth(accessToken: string, removeTokens:Function) {
        this.setIsLoading(true);
        this.setIsError(false);

        try {
            const user = await authService.auth(accessToken)
            this.setUser(user);
        } catch (err) {
            console.log("err", err)
            this.setIsError(true);
            this.setUser(null);

            removeTokens();
        }

        this.setIsLoading(false);
    }
}

export const userStore = new UserStore()