import e, { Request, Response, Router } from "express";
import Pet, { IPet } from "../models/Pet";
import verifyToken from "../helpers/verifyToken";
import logger from "../middleware/global/logger/logger";
import { imageUpload } from "../helpers/imageUpload";
import { excluiImagemAtual } from "../helpers/excluiImagemAtual";
import { isObjectIdOrHexString } from "mongoose";

const petsController = Router();

petsController.get('/', verifyToken, async (req: Request, res: Response) => {
    try {
        const pets = await Pet.find().sort({ createdAt: -1 });
        res.status(200).json(pets);
    } catch (error) {
        res.status(400).json({ Error: error });
    }
});

petsController.get('/mypets', verifyToken, async (req: Request, res: Response) => {
    const userId = req.user.id;

    try {
        const pets = await Pet.find({ user: userId }).sort({ createdAt: -1 });
        res.status(200).json(pets);
    } catch (error) {
        res.status(400).json({ Error: error });
    }
});

petsController.get('/myadoptions', verifyToken, async (req: Request, res: Response) => {
    const userId = req.user.id;

    try {
        const pets = await Pet.find({ adopter: userId }).sort({ createdAt: -1 });
        res.status(200).json(pets);
    } catch (error) {
        res.status(400).json({ Error: error });
    }
});

petsController.get('/:id', verifyToken, async (req: Request, res: Response) => {
    const petId = req.params.id;
    if (!isObjectIdOrHexString(petId)) {
        res.status(400).json({ Error: 'Invalid ID' });
        return;
    }

    try {
        const pet = await Pet.findById(petId);
        if (!pet) {
            res.status(404).json({ Error: 'Pet not found' });
            return;
        }
        res.status(200).json(pet);
    } catch (error) {
        res.status(400).json({ Error: error });
    }
});

petsController.delete('/:id', verifyToken, async (req: Request, res: Response) => {
    const petId = req.params.id;
    if (!isObjectIdOrHexString(petId)) {
        res.status(400).json({ Error: 'Invalid ID' });
        return;
    }

    try {
        const pet = await Pet.findById(petId);
        if (!pet) {
            res.status(404).json({ Error: 'Pet not found' });
            return;
        }

        if (pet.user.toString() !== req.user.id) {
            res.status(403).json({ Error: 'Not your pet' });
            return;
        }

        excluiImagemAtual({ image: pet.image } as IPet);
        await pet.deleteOne();

        res.status(204).send();
    } catch (error) {
        res.status(400).json({ Error: error });
    }

});

petsController.put('/:id', verifyToken, imageUpload.array("images"), async (req: Request, res: Response) => {
    const petId = req.params.id;
    const { name, age, weight, color, available } = req.body;
    const images = req.files as Express.Multer.File[];
    const userId = req.user.id;

    if (!isObjectIdOrHexString(petId)) {
        res.status(400).json({ Error: 'Invalid ID' });
        return;
    }

    const pet = await Pet.findById(petId);

    if (!pet) {
        res.status(404).json({ Error: 'Pet not found' });
        return;
    }

    if (pet.user.toString() !== userId) {
        res.status(403).json({ Error: 'Not your pet' });
        return;
    }

    if (name) pet.name = name;
    if (age) pet.age = age;
    if (weight) pet.weight = weight;
    if (color) pet.color = color;
    if (available) pet.available = available;

    if (images.length > 0) {
        images.map((image: Express.Multer.File) => {
            pet.image.push(image.filename);
        });
    }

    try {
        await pet.save();
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ Error: error });
    }
});

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