//import { IJWTClaims } from "./src/helpers/createUserToken"; // Não utilizar imports, senão nõa funcionará

declare namespace Express {
    export interface Request {
        user: IJWTClaims;
    }
}