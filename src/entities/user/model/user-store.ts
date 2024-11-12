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

    public async auth(accessToken: string, refreshToken: string, updateTokens: (accessToken:string, refreshToken:string) => void) {
        this.setIsLoading(true);
        this.setIsError(false);

        try {
            const user = await authService.auth(accessToken)
            this.setUser(user);//User by access_token
        } catch (err) {
            try {
                const refreshResponse = await this.refresh(refreshToken);//User by refresh_token
                const user = await authService.auth(refreshResponse.access_token)
                updateTokens(refreshResponse.access_token, refreshResponse.refresh_token);
                this.setUser(user);
            } catch (err) {//no user
                this.setIsError(true);
                this.setUser(null);
                updateTokens("", "");
            }
        }

        this.setIsLoading(false);
    }


    private async refresh(refreshToken: string) {
        const authResponse = await authService.refresh(refreshToken);
        return authResponse;
    }
}

export const userStore = new UserStore()