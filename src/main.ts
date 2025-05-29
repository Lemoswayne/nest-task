// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove as chaves que não estão no DTO
      forbidNonWhitelisted: true, // Lança um erro se houver chaves não permitidas
      transform: true, // Transforma os dados de entrada para os tipos definidos nos DTOs
    }),
  );
}
bootstrap();
