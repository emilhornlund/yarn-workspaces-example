import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { EnvironmentVariables } from './configuration';

/**
 * Service for accessing application configuration variables.
 *
 * Provides typed access to validated environment variables using
 * NestJS `ConfigService`.
 */
@Injectable()
export class ApiConfigService {
  /**
   * Creates an instance of `ApiConfigService`.
   *
   * @param configService - Injected NestJS `ConfigService` with typed environment variables.
   */
  constructor(private configService: ConfigService<EnvironmentVariables>) {}

  /**
   * Returns the configured server port.
   *
   * @returns The port number the server should listen on.
   */
  get serverPort(): number {
    return this.configService.get('SERVER_PORT', { infer: true })!;
  }
}
