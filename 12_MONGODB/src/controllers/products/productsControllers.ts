import { Request, Response } from "express";
import Product from "../../models/Product";
import logger from "../../configuration/general/logger/logger";

export default class ProductController {
  static async getProduct(req: Request, res: Response) {
    const { id } = req.params
    const product = await Product.getProductById(id);
    res.render("products/product", { product });
  }

  static async getProducts(req: Request, res: Response) {
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

  static async editProduct(req: Request, res: Response) {
    const { id } = req.params;
    const product = await Product.getProductById(id);
    res.render("products/edit", { product });
  }

  static async editProductPost(req: Request, res: Response) {
    const { id, name, price, image, description } = req.body;
    const product = new Product(name, price, image, description);
    await product.update(id);
    res.redirect("/products");
  }

  static async deleteProduct(req: Request, res: Response) {
    const { id } = req.params;
    await Product.removeById(id);
    res.redirect("/products");
  }
}