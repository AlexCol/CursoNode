import { Application } from 'express';
import express from 'express';

function addExpress(app: Application): void {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static('public'));
}

export default addExpress;