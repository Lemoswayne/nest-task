// src/app/app.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getStatus() {
    return {
      status: 'ok',
      name: 'Nest Task API',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
    };
  }
}
