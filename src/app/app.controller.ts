// src/app/app.controller.ts
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Status') // Adiciona uma tag para o Swagger
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('Status')
  getStatus() {
    return this.appService.getStatus();
  }
}
