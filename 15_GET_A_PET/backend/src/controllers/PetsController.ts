import { Router } from "express";

const petsController = Router();

petsController.get('/', (req, res) => {
    res.send('Pets Controller');
});

export default petsController;