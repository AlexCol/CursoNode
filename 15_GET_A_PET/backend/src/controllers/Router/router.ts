import express, { Router, Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import logger from '../../middleware/global/logger/logger';

const router = Router();

//????????????????????????????????????????????????????????????????? configuracoes
router.use(express.urlencoded({ extended: true }));
router.use(express.json());
//????????????????????????????????????????????????????????????????? configuracoes

/* rota base */
router.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

// Diretório dos controladores (ajuste para o caminho correto)
const controllersDir = path.join(__dirname, '..');
logger.info(`controllersDir: ${controllersDir}`);

// Função para registrar automaticamente os controladores
fs.readdirSync(controllersDir).forEach(async (file) => {
    if (file.endsWith('Controller.ts') || file.endsWith('Controller.js')) {
        const controllerName = file.replace(/Controller\.(ts|js)$/, '').toLowerCase();
        const controllerPath = path.resolve(controllersDir, file);
        const controllerModule = await import(controllerPath);
        router.use(`/${controllerName}`, controllerModule.default || controllerModule);
        logger.info(`Controller /${controllerName} registrado.`);
    }
});

export default router;