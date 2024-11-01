import { Application } from 'express';
import cors from 'cors';

function addCors(app: Application): void {
    const host = process.env.FRONTHOST ?? 'http://localhost';
    const port = process.env.FRONTPORT ?? '3000';

    app.use(cors(
        {
            origin: `${host}:${port}`,
            credentials: true
        }
    ));
}

export default addCors;