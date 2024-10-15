import {serverConnection} from "./server-connection";
import {SignInDto} from "./types/sign-in.dto";
import {AuthResult} from "./types/auth-result";

class SignInService {
    constructor() {
    }

    public async signIn(signInDto: SignInDto): Promise<AuthResult> {
        return (await serverConnection.post("auth/sign-in", new URLSearchParams(signInDto), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })).data;
    }
}

export const signInService = new SignInService()