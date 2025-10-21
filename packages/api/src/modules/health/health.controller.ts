import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
} from '@nestjs/terminus';

/**
 * Controller providing health check endpoints.
 *
 * Used for readiness and liveness probes.
 */
@ApiTags('health')
@Controller('/health')
export class HealthController {
  /**
   * Creates an instance of `HealthController`.
   *
   * @param health - Terminus `HealthCheckService` instance.
   */
  constructor(private readonly health: HealthCheckService) {}

  /**
   * Performs a health check.
   *
   * @returns The current health status of the application.
   */
  @Get()
  @HealthCheck()
  async check(): Promise<HealthCheckResult> {
    return this.health.check([]);
  }
}
