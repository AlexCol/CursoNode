import 'express-session';

declare module 'express-session' {
  interface SessionData {
    userid?: number; // Adicione outras propriedades se necessário
  }
}