/* eslint-disable @typescript-eslint/no-unsafe-call */
// src/board/dto/create-board.dto.ts
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBoardDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  userId: string;
}
