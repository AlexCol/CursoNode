import { Request } from "express"

export const getToken = (req: Request) => {
    const authHeader = req.headers.authorization;
    const splitedToken = authHeader?.split(' ');
    if (splitedToken?.length === 2 && splitedToken[0] === 'Bearer') {
        return splitedToken[1];
    }
    return "";
}