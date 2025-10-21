import { BadRequestException, ValidationError } from '@nestjs/common';

/**
 * Represents a single validation constraint error.
 */
export interface ValidationConstraintError {
  /** The property path where the validation failed. */
  property: string;
  /** Validation error messages for each failed constraint. */
  constraints: Record<string, string>;
}

/**
 * Exception thrown when a request payload fails validation.
 */
export class ValidationException extends BadRequestException {
  /** List of validation errors reported by `class-validator`. */
  validationErrors: ValidationError[];

  /**
   * Constructs a new `ValidationException`.
   *
   * @param validationErrors - Validation errors to include in the exception.
   */
  constructor(validationErrors: ValidationError[]) {
    super('Validation failed');
    this.validationErrors = validationErrors;
  }
}
