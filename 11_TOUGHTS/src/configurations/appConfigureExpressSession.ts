import { Application } from "express";
import session from "express-session";
import path from "path";
import SessionFileStore from 'session-file-store'; //SessionFileStore (pode ser qq nome)
import os from 'os';

export function appConfigureExpressSession(app: Application) {
  const FileStore = SessionFileStore(session);

  app.use(session({
    name: "session",
    secret: "my_super_dupper_mega_secret",
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
      logFn: function () { },
      path: path.join(os.tmpdir(), 'session') //obtem a pasta temporaria do sistema do usuario (ex.C:\Users\ALEXAN~1\AppData\Local\Temp\session)
    }),
    cookie: {
      secure: false,
      maxAge: 360000,
      httpOnly: true
    }
  }));
}