import { Request, Response, Router } from "express";
import User, { IUser } from "../models/User";
import { CryptoPassword } from "../util/Crypto";
import { createUserToken } from "../helpers/createUserToken";
import { isObjectIdOrHexString } from "mongoose";
import verifyToken from "../helpers/verifyToken";
import { imageUpload } from "../helpers/imageUpload";
import { excluiImagemAtual } from "../helpers/excluiImagemAtual";

const usersController = Router();

usersController.get("/", (req: Request, res: Response) => {
  res.send("Users Controller");
});

usersController.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!isObjectIdOrHexString(id)) {
    res.status(400).json({ Error: "Invalid ID" });
    return;
  }

  const user = (await User.findById(id).select("-password")) as IUser;

  if (!user) {
    res.status(404).json({ Error: "User not found" });
    return;
  }

  //user.password = undefined; --sem necessidade por causa do select
  res.status(200).json({ user });
});

usersController.post("/register", async (req: Request, res: Response) => {
  const { name, email, phone, password, confirmPassword } = req.body;

  //validations
  let errors: string[] = [];

  if (!name) errors.push("Name is required");
  if (!phone) errors.push("Phone is required");
  if (!email) errors.push("Email is required");
  if (!password) errors.push("Password is required");
  if (!confirmPassword) errors.push("Confirm Password is required");
  if (password !== confirmPassword) errors.push("Passwords do not match");
  if (errors.length > 0) {
    res.status(422).json({ errors });
    return;
  }

  //check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(409).json({ Error: "User already exists" });
    return;
  }

  //create password hash
  const hashedPassword = await CryptoPassword(password);

  //create user
  const user = new User({
    name,
    email,
    phone,
    password: hashedPassword,
  });

  try {
    await user.save();
    await createUserToken(user, req, res); //feito pelo curso, mas não é boa pratica retornar o token no registro, pois assim não há validações de email, etc.
  } catch (error) {
    res.status(500).json({ Error: error });
  }
});

usersController.put("", verifyToken, imageUpload.single("image"), async (req: Request, res: Response) => {
  const { id } = req.user;
  const { name, email, password, confirmPassword, phone } = req.body;

  try {
    if (!isObjectIdOrHexString(id)) {
      res.status(400).json({ Error: "Invalid ID" });
      return;
    }
    if ((password || confirmPassword) && password !== confirmPassword) {
      res.status(422).json({ Error: "Passwords do not match" });
      return;
    }

    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({ Error: "User not found" });
      return;
    }

    if (name) user.name = name;
    if (password) user.password = await CryptoPassword(password.toString());
    if (phone) user.phone = phone;

    if (email) {
      const emailExists = await User.findOne({ email });
      if (emailExists && emailExists._id.toString() !== id) {
        res.status(409).json({ Error: "Email already exists for another user" });
        return;
      } else {
        user.email = email;
      }
    }

    if (req.file) {
      excluiImagemAtual(user);
      user.image = req.file.filename;
    }

    await user.save();
    res.status(200).json({ Message: "User updated" });
  } catch (error) {
    res.status(500).json({ Error: error });
  }
});

export default usersController;
