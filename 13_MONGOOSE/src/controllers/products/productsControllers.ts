import { Request, Response } from "express";

import logger from "../../configuration/general/logger/logger";
import Product from "../../models/Product";

export default class ProductController {
  static async getProduct(req: Request, res: Response) {
    const { id } = req.params
    const product = await Product.findById(id).lean();
    res.render("products/product", { product });
  }

  static async getProducts(req: Request, res: Response) {
    const products = await Product.find().lean(); //!lean é equivalente ao raw do sequelize, para retornar apenas os dados brutos
    res.render("products/all", { products });
  }

  static createProduct(req: Request, res: Response) {
    res.render("products/create");
  }

  static async createProductPost(req: Request, res: Response) {
    try {
      const { name, price, image, description } = req.body;
      const product = new Product({ name, price, image, description });
      await product.save();
    } catch (err) {
      logger.error(err);
    }
    res.redirect("/products");
  }

  static async editProduct(req: Request, res: Response) {
    const { id } = req.params;
    console.log(id);
    const product = await Product.findById(id).lean();
    res.render("products/edit", { product });
  }

  static async editProductPost(req: Request, res: Response) {
    const { id, name, price, image, description } = req.body;
    const product = { name, price, image, description };
    await Product.updateOne({ _id: id }, product);
    res.redirect("/products");
  }

  static async deleteProduct(req: Request, res: Response) {
    const { id } = req.params;
    console.log(id);
    await Product.deleteOne({ _id: id });
    res.redirect("/products");
  }
}