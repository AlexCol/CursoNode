import { Router } from "express";
import ProductController from "../../controllers/products/productsControllers";

const produtcsRouter = Router();

produtcsRouter.get("/", ProductController.showProducts);
produtcsRouter.get("/create", ProductController.createProduct);
produtcsRouter.post("/create", ProductController.createProductPost);

export default produtcsRouter;