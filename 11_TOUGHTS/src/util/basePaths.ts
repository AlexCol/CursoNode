import path from "path";

export const srcPath = path.dirname(__dirname);
export const basePath = path.dirname(srcPath);

export const viewsRootPath = path.join(srcPath, 'views');
export const modelsRootPath = path.join(srcPath, 'models');
export const publicPath = path.join(srcPath, 'public');