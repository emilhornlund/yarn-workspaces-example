import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

import { ValidationException } from '../exceptions';

/**
 * Global validation pipe for validating and transforming incoming requests.
 *
 * Automatically converts plain objects to class instances and validates
 * them using `class-validator`. Throws `ValidationException` on failure.
 */
@Injectable()
export class ValidationPipe implements PipeTransform {
  /**
   * Validates incoming request data.
   *
   * @param value - The incoming request payload.
   * @param metadata - Metadata describing the route argument type.
   * @returns The validated and transformed value.
   * @throws {BadRequestException} If no payload is provided.
   * @throws {ValidationException} If validation fails.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || this.isPrimitive(metatype)) {
      return value;
    }

    const object = plainToInstance(metatype, value);
    if (!object || typeof object !== 'object') {
      throw new BadRequestException('Missing request payload');
    }

    const errors = await validate(object);
    if (errors.length > 0) {
      throw new ValidationException(errors);
    }
    return value;
  }

  /**
   * Determines whether a metatype represents a primitive type.
   *
   * @param metatype - The metatype to check.
   * @returns `true` if the type is primitive, otherwise `false`.
   */
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  private isPrimitive(metatype: Function): boolean {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return types.includes(metatype);
  }
}
