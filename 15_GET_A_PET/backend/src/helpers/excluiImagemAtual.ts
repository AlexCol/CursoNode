import { Response } from "express";
import { IPet } from "../models/Pet";
import User, { IUser } from "../models/User";

export function excluiImagemAtual(registro: IUser | IPet) {
    const tipo = registro instanceof User ? 'users' : 'pets';

    if (registro.image) {
        const fs = require('fs');
        if (!Array.isArray(registro.image)) {
            fs.unlink(`public/images/${tipo}/${registro.image}`, (err: any) => {
                if (err && err.code !== 'ENOENT') { // Ignora erro se o arquivo não existir
                    throw err;
                }
            });
        } else {
            registro.image.forEach((image: string) => {
                fs.unlink(`public/images/${tipo}/${image}`, (err: any) => {
                    if (err && err.code !== 'ENOENT') { // Ignora erro se o arquivo não existir
                        throw err;
                    }
                });
            });
        }
    }
}