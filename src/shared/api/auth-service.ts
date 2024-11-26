import { serverConnection } from "./server-connection";
import { User } from "./types/user";
import { AuthResult } from "./types/auth-result";

class AuthService {
   constructor() {}

   public async auth(accessToken: string | null): Promise<User> {
      return (
         await serverConnection.get("users/me", {
            headers: accessToken ? { Authorization: "Bearer " + accessToken || "" } : undefined,
         })
      ).data;
   }

   public async refresh(refreshToken: string | null): Promise<AuthResult> {
      return (
         await serverConnection.get("users/me", {
            headers: refreshToken ? { Authorization: "Bearer " + refreshToken || "" } : undefined,
         })
      ).data;
   }
}

export const authService = new AuthService();
