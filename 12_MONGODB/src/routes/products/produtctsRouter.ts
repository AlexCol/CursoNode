import { Router } from "express";
import ProductController from "../../controllers/products/productsControllers";

const produtcsRouter = Router();
/* rotas criação */
produtcsRouter.get("/create", ProductController.createProduct);
produtcsRouter.post("/create", ProductController.createProductPost);

/* rotas edição */
produtcsRouter.get("/edit/:id", ProductController.editProduct);
produtcsRouter.post("/edit", ProductController.editProductPost);

/* rotas busca */
produtcsRouter.get("/", ProductController.getProducts);
produtcsRouter.get("/:id", ProductController.getProduct); //!rotas variaveis devem ficar abaixo, se deixar acima, ele não sabe se que o 'create' não é id

/* rota exclusão */
produtcsRouter.post("/remove/:id", ProductController.deleteProduct);

export default produtcsRouter;