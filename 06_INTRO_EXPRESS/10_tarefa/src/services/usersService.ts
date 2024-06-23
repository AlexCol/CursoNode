import { Request, Response } from "express";
import { pagesRootPath } from "../util/baseConfigs";
import path from "path";

const usersRootPagePath = path.join(pagesRootPath, 'users');

export const GetUsersPage = (req: Request, res: Response) => {
  res.sendFile(usersRootPagePath + '/users.html');
}