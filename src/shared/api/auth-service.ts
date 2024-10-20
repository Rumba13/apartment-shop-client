import {serverConnection} from "./server-connection";
import {User} from "./types/user";

class AuthService {
    constructor() {
    }

    public async auth(accessToken: string):Promise<User> {
        return (await serverConnection.get("users/me", {

            headers: accessToken ? {"Authorization": "Bearer " + accessToken}: undefined,
        })).data
    }
}

export const authService = new AuthService();