import {serverConnection} from "./server-connection.mocked";
import {User} from "./types/user";

class AuthService {
    constructor() {
    }

    public async auth(accessToken: string):Promise<User> {
        return (await serverConnection.get("users/me", {
            headers: {"Authorization": "Bearer " + accessToken},
        })).data
    }
}

export const authService = new AuthService();