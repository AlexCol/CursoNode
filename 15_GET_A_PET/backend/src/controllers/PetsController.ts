import e, { Request, Response, Router } from "express";
import Pet, { IPet } from "../models/Pet";
import verifyToken from "../helpers/verifyToken";
import logger from "../middleware/global/logger/logger";
import { imageUpload } from "../helpers/imageUpload";
import { excluiImagemAtual } from "../helpers/excluiImagemAtual";
import { isObjectIdOrHexString } from "mongoose";
import User from "../models/User";

const petsController = Router();

petsController.use(verifyToken); //todas as rotas do controller são protegidas

petsController.get('/', async (req: Request, res: Response) => {
  try {
    const pets = await Pet.find().sort({ createdAt: -1 });
    res.status(200).json(pets);
  } catch (error) {
    res.status(400).json({ Error: error });
  }
});

petsController.get('/mypets', async (req: Request, res: Response) => {
  const userId = req.user.id;

  try {
    const pets = await Pet.find({ user: userId }).sort({ createdAt: -1 });
    res.status(200).json(pets);
  } catch (error) {
    res.status(400).json({ Error: error });
  }
});

petsController.get('/myadoptions', async (req: Request, res: Response) => {
  const userId = req.user.id;

  try {
    const pets = await Pet.find({ adopter: userId }).sort({ createdAt: -1 });
    res.status(200).json(pets);
  } catch (error) {
    res.status(400).json({ Error: error });
  }
});

petsController.get('/:id', async (req: Request, res: Response) => {
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

petsController.delete('/:id', async (req: Request, res: Response) => {
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

    excluiImagemAtual({ image: pet.images } as IPet);
    await pet.deleteOne();

    res.status(204).send();
  } catch (error) {
    res.status(400).json({ Error: error });
  }

});

petsController.put('/:id', imageUpload.array("images"), async (req: Request, res: Response) => {
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
      pet.images.push(image.filename);
    });
  }

  try {
    await pet.save();
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ Error: error });
  }
});

petsController.post('/', imageUpload.array("images"), async (req: Request, res: Response) => {
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
    newPet.images.push(image.filename);
  });

  try {
    if (await Pet.findOne({ name, user: userId })) {
      res.status(409).json({ Error: 'Pet already exists for this owner' });
      if (newPet?.images) excluiImagemAtual({ image: newPet.images } as IPet);
      return;
    }

    await newPet.save();
    res.status(201).send();
  } catch (error) {
    res.status(400).json({ Error: error });
  }
});

petsController.patch('/schedule/:id', async (req: Request, res: Response) => {
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

    if (pet.user.toString() == req.user.id) {
      res.status(403).json({ Error: 'Must schedule to another users Pet' });
      return;
    }

    if (pet.adopter) {
      if (pet.adopter.toString() == req.user.id)
        res.status(403).json({ Error: 'You already scheduled this Pet' });
      else
        res.status(403).json({ Error: 'Pet already scheduled by another user' });
      return;
    }

    pet.adopter = req.user.id;
    await pet.save();

    const owner = await User.findById(pet.user).select({ name: 1, phone: 1 });
    res.status(200).json({ message: `Schedule successfully. Call ${owner?.name} on the phone ${owner?.phone} the choose the location for the visit.` });
  } catch (error) {
    res.status(400).json({ Error: error });
  }
});

petsController.patch('/concludeadoption/:id', async (req: Request, res: Response) => {

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
      res.status(403).json({ Error: 'Only the owner can conclude the adoption!' });
      return;
    }

    if (!pet.adopter) {
      res.status(403).json({ Error: 'No one scheduled this Pet' });
      return;
    }

    pet.available = false;
    await pet.save();
    res.status(200).json({ message: 'Adoption concluded successfully' });
  } catch (error) {
    res.status(400).json({ Error: error });
  }
});

export default petsController;