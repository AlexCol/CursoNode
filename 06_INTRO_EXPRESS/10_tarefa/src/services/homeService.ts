import { Request, Response } from "express";
import { pagesRootPath } from "../util/baseConfigs";
import path from "path";

const homeRootPagePath = path.join(pagesRootPath, 'home');

export const GetHomePage = (req: Request, res: Response) => {
  res.sendFile(homeRootPagePath + '/home.html');
}