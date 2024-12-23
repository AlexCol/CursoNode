import { Request, Response, Router } from "express";
import User, { IUser } from "../models/User";
import { ComparePassword } from "../util/Crypto";
import { createUserToken, IJWTClaims } from "../helpers/createUserToken";
import { getToken } from "../helpers/getToken";
import jwt from "jsonwebtoken";

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
    if (!token) {
      res.status(401).json({ Error: 'Unauthorized' });
      return;
    }

    try {
      const secret = process.env.JWT_SECRET || 'secret';
      const decoded = jwt.verify(token, secret) as IJWTClaims;

      currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        res.status(404).json({ Error: 'User not found' });
        return;
      }
      currentUser.password = undefined;
    } catch (error) {
      res.status(401).json({ Error: error });
      return;
    }

  } else {
    currentUser = null;
  }
  res.status(200).json({ currentUser });
});

export default authController;