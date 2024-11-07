import jwt, { SignOptions } from 'jsonwebtoken';
import { Request, Response } from 'express';
import { IUser } from '../models/User';

export const createUserToken = (user: IUser, req: Request, res: Response) => {

    const claims = {
        name: user.name,
        id: user._id,
        demaisClaims: "demaisClaims"
    };
    const secretKey = process.env.JWT_SECRET as string;
    const jwtOptions: SignOptions = {
        issuer: 'get-a-pet',
        audience: 'audience',
        algorithm: 'HS512',
        expiresIn: '24h'
    };

    const token = jwt.sign(claims, secretKey, jwtOptions);
    res.status(200).json({
        token: token,
        message: 'User logged in successfully'
    });
};
