import {SignUpDto} from "./types/sign-up.dto";
import {serverConnection} from "./server-connection";
import {AuthResult} from "./types/auth-result";

class SignUpService {
    constructor() {
    }

    public async signUp(signUpDto: SignUpDto):Promise<AuthResult> {
        return (await serverConnection.post("auth/sign-up", {
            username: signUpDto.username,
            password: signUpDto.password,
            email: signUpDto.email,
        }, {})).data;
    }
}

export const signUpService = new SignUpService()