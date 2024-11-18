import e, { Request, Response, Router } from "express";
import Pet, { IPet } from "../models/Pet";
import verifyToken from "../helpers/verifyToken";
import logger from "../middleware/global/logger/logger";
import { imageUpload } from "../helpers/imageUpload";
import { excluiImagemAtual } from "../helpers/excluiImagemAtual";

const petsController = Router();

petsController.post('/', verifyToken, imageUpload.array("images"), async (req: Request, res: Response) => {
    const { name, age, weight, color } = req.body;
    const images = req.files as Express.Multer.File[];

    //validations
    let errors: string[] = [];

    if (!name) errors.push('Name is required');
    if (!age) errors.push('Age is required');
    if (!weight) errors.push('Weight is required');
    if (!color) errors.push('Color is required');
    if (images.length == 0) errors.push('Image is required');
    if (errors.length > 0) {
        res.status(422).json({ errors });
        return;
    };

    const userId = req.user.id;
    const newPet = new Pet({
        name,
        age,
        weight,
        color,
        available: true,
        image: [],
        user: userId
    });

    images.map((image: Express.Multer.File) => {
        newPet.image.push(image.filename);
    });

    try {
        if (await Pet.findOne({ name, user: userId })) {
            res.status(409).json({ Error: 'Pet already exists for this owner' });
            if (newPet?.image) excluiImagemAtual({ image: newPet.image } as IPet);
            return;
        }

        await newPet.save();
        res.status(201).send();
    } catch (error) {
        res.status(400).json({ Error: error });
    }
});

export default petsController;