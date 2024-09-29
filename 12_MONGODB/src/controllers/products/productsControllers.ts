import { Request, Response } from "express";

export default class ProductController {
  static showProducts(req: Request, res: Response) {
    res.render("products/all");
  }
}