import { Request, Response } from "express";
import Product from "../../models/Product";
import logger from "../../configuration/general/logger/logger";

export default class ProductController {
  static showProducts(req: Request, res: Response) {
    res.render("products/all");
  }

  static createProduct(req: Request, res: Response) {
    res.render("products/create");
  }

  static async createProductPost(req: Request, res: Response) {
    try {
      const { name, price, description } = req.body;
      const product = new Product(name, price, description);
      await product.save();
    } catch (err) {
      logger.error(err);
    }
    res.redirect("/products");
  }
}