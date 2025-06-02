// Cliente -> Servidor -> Middlewares (pode  atuar como um interceptor, filter, pipe etc...)
// NestsJs -> (Guards, Interceptors, Pipes) -> Controllers -> Services

import { NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';

export class SimpleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Exemplo de middleware simples que loga a requisição
    console.log(`Request... ${req.method} ${req.url}`);

    // Chama o próximo middleware ou rota
    next();
  }
}
