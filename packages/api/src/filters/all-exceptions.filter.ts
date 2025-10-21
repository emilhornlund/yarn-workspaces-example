import {
  type ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
  ValidationError,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

import { ValidationConstraintError, ValidationException } from '../exceptions';

/**
 * Global exception filter for handling all uncaught errors.
 *
 * Converts exceptions into consistent HTTP responses, including
 * validation and internal server errors.
 */
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  /**
   * Creates an instance of `AllExceptionsFilter`.
   *
   * @param httpAdapterHost - Provides the underlying HTTP adapter.
   * @param logger - Logger instance for recording unexpected errors.
   */
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private logger: Logger,
  ) {}

  /**
   * Catches all thrown exceptions and sends a standardized HTTP response.
   *
   * @param exception - The exception object thrown.
   * @param host - The current request context.
   */
  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    if (exception instanceof Error && !(exception instanceof HttpException)) {
      this.logger.error(
        exception.message,
        exception.stack,
        'AllExceptionsFilter',
      );
    }

    const message =
      exception instanceof HttpException
        ? exception.message
        : 'Internal Server Error';

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const validationErrors =
      exception instanceof ValidationException
        ? this.reduceNestedValidationErrors(exception.validationErrors)
        : undefined;

    const timestamp = new Date().toISOString();

    const responseBody = { message, status, validationErrors, timestamp };

    httpAdapter.reply(ctx.getResponse(), responseBody, status);
  }

  /**
   * Recursively reduces nested validation errors into a flat list.
   *
   * @param errors - The validation errors to process.
   * @param parentProperty - (optional) Parent property name for nested fields.
   * @returns A flattened array of `ValidationConstraintError` objects.
   */
  private reduceNestedValidationErrors(
    errors: ValidationError[],
    parentProperty: string = '',
  ): ValidationConstraintError[] {
    return errors.reduce<ValidationConstraintError[]>((result, error) => {
      const propertyPath = parentProperty
        ? `${parentProperty}.${error.property}`
        : error.property;

      if (error.constraints) {
        result.push({
          property: propertyPath,
          constraints: error.constraints,
        });
      }

      if (error.children && error.children.length > 0) {
        result.push(
          ...this.reduceNestedValidationErrors(error.children, propertyPath),
        );
      }

      return result;
    }, []);
  }
}
