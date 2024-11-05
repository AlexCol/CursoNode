import jwt, { SignOptions } from 'jsonwebtoken';
import { Request, Response } from 'express';
import { IUser } from '../models/User';

const createToken = (user: IUser, req: Request, res: Response) => {

    const payload = {
        name: user.name,
        id: user._id
    };
    const secretKey = process.env.JWT_SECRET as string;
    const jwtOptions: SignOptions = {
        issuer: 'get-a-pet',
        audience: 'audience'
    };

    const token = jwt.sign(payload, secretKey, jwtOptions);
};
