import { Request, Response } from "express";
import Product from "../../models/Product";
import logger from "../../configuration/general/logger/logger";

export default class ProductController {
  static async showProducts(req: Request, res: Response) {
    const products = await Product.getProducts();
    res.render("products/all", { products });
  }

  static createProduct(req: Request, res: Response) {
    res.render("products/create");
  }

  static async createProductPost(req: Request, res: Response) {
    try {
      const { name, price, image, description } = req.body;
      const product = new Product(name, price, image, description);
      await product.save();
    } catch (err) {
      logger.error(err);
    }
    res.redirect("/products");
  }
}