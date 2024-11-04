import { Request, Response, Router } from "express";
import User from "../models/User";
import bcrypt from 'bcrypt';

const usersController = Router();

usersController.get('/', (req: Request, res: Response) => {
    res.send('Users Controller');
});

usersController.post('/register', async (req: Request, res: Response) => {
    const { name, email, phone, password, confirmPassword } = req.body;

    //validations
    let errors: string[] = [];

    if (!name) errors.push('Name is required');
    if (!email) errors.push('Email is required');
    if (!phone) errors.push('Phone is required');
    if (!password) errors.push('Password is required');
    if (!confirmPassword) errors.push('Confirm Password is required');
    if (password !== confirmPassword) errors.push('Passwords do not match');
    if (errors.length > 0) {
        res.status(422).json({ errors });
        return;
    };

    //check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(409).json({ Error: 'User already exists' });
        return;
    }

    //create password hash
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create user
    const user = new User({
        name,
        email,
        phone,
        password: hashedPassword
    });

    try {
        await user.save();
        res.status(201).json({ Success: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ Error: error });
    }
});

export default usersController;