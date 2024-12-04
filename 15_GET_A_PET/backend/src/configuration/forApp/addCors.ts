import { Application } from 'express';
import cors from 'cors';

function addCors(app: Application): void {
    const host = `http://${process.env.FRONTHOST ?? 'localhost'}`;
    const port = process.env.FRONTPORT ?? '3005';

    app.use(cors(
        {
            origin: `${host}:${port}`,
            credentials: true
        }
    ));
}

export default addCors;