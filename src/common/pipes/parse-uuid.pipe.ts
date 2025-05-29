import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseUUIDPipe implements PipeTransform {
  transform(value: string): string {
    if (!value || !this.isValidUUID(value)) {
      throw new Error(`Invalid UUID: ${value}`);
    }
    return value;
  }

  private isValidUUID(value: string): boolean {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(value);
  }
}
