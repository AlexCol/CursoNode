import { Request, Response } from "express";
import { pagesRootPath } from "../util/baseConfigs";
import path from "path";

const NotFoundRootPagePath = path.join(pagesRootPath, 'notFound');

export const GetNotFoundPage = (req: Request, res: Response) => {
  res.sendFile(NotFoundRootPagePath + '/notFound.html');
}