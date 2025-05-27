// pagination
import { IsOptional, IsInt, Min } from 'class-validator';
export class PaginationDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number = 10;

  constructor(page?: number, limit?: number) {
    this.page = page || 1;
    this.limit = limit || 10;
  }
}
