import {serverConnection} from "./server-connection.mocked";

class SignOutService {
    constructor() {
    }

    public async signOut(refreshToken: string): Promise<any> {
        return (await serverConnection.post("auth/sign-out", {}, {
            headers: {
                Authorization: "Bearer " + refreshToken
            }
        })).data;
    }
}

export const signOutService = new SignOutService()