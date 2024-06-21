import { Router, Request, Response } from 'express';
import { pagesPath } from '../../basePaths';


const baseRoutes = Router();

//!metoo get padrao para abrir na raiz
function MeuRetornoGet(req: Request, res: Response) {
  console.log(pagesPath);
  res.sendFile(`${pagesPath}/index.html`);
}
baseRoutes.get('/', MeuRetornoGet);

export default baseRoutes;