import {makeAutoObservable} from "mobx";
import {User} from "../../../shared/api/types/user";
import {authService} from "../../../shared/api/auth-service";

class UserStore {
    constructor() {
        makeAutoObservable(this)
    }

    public user: User | null = null;
    public setUser = (user: User | null) => this.user = user

    public async auth(accessToken: string) {
        authService.auth(accessToken).then(user => {
            this.setUser(user)
        }).catch(err => {})
    }
}

export const userStore = new UserStore()