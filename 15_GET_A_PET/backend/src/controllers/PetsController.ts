import { Request, Response, Router } from "express";
import Pet, { IPet } from "../models/Pet";
import verifyToken from "../helpers/verifyToken";
import logger from "../middleware/global/logger/logger";

const petsController = Router();

petsController.post('/', verifyToken, async (req: Request, res: Response) => {
    const { name, age, weight, color } = req.body;

    const userId = req.user.id;
    const newPet = new Pet({
        name,
        age,
        weight,
        color,
        available: true,
        user: userId
    });

    try {
        if (await Pet.findOne({ name, user: userId })) {
            res.status(409).json({ Error: 'Pet already exists for this owner' });
            return;
        }

        await newPet.save();
        res.status(201).send();
    } catch (error) {
        res.status(400).json({ Error: error });
    }
});

export default petsController;