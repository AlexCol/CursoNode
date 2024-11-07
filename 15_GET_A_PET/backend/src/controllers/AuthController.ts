import { Request, Response, Router } from "express";
import User from "../models/User";
import { ComparePassword, CryptoPassword } from "../util/Crypto";
import { createUserToken } from "../helpers/createUserToken";
import logger from "../middleware/global/logger/logger";
import { getToken } from "../helpers/getToken";

const authController = Router();

authController.post('/login', async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !(await ComparePassword(password, user.password))) {
        res.status(404).json({ Error: 'User not found or password incorrect' });
        return;
    }

    await createUserToken(user, req, res);
});

authController.get('/checkuser', async (req: Request, res: Response) => {
    let currentUser;
    console.log(req.headers.authorization);
    if (req.headers.authorization) {
        const token = getToken(req);

    } else {
        currentUser = null;
    }
    res.status(200).json({ currentUser });
});

export default authController;