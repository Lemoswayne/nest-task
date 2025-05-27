/* eslint-disable @typescript-eslint/no-unsafe-call */
// src/task/dto/create-task.dto.ts
import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  boardId: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  status: string;

  @IsNumber()
  order: number;

  @IsDateString()
  @IsOptional()
  dueDate?: Date;

  @IsBoolean()
  @IsOptional()
  completed?: boolean;
}
