import { Router } from "express";
import ProductController from "../../controllers/products/productsControllers";

const produtcsRouter = Router();

produtcsRouter.get("/", ProductController.showProducts);

export default produtcsRouter;