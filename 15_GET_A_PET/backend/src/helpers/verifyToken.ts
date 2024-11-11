import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { IJWTClaims } from "./createUserToken";
import { getToken } from "./getToken";

function verifyToken(req: Request, res: Response, next: NextFunction) {
    const token = getToken(req);
    if (!token) {
        res.status(401).send('Access Denied');
        return;
    }

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET || "") as IJWTClaims;
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).send(`Invalid Token: ${error}`);
    }
}

export default verifyToken;
