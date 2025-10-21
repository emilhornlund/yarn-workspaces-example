import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';

import { HealthController } from './health.controller';

/**
 * Module responsible for health checks.
 *
 * Provides a controller exposing liveness and readiness endpoints
 * using NestJS Terminus.
 */
@Module({
  imports: [TerminusModule],
  controllers: [HealthController],
})
export class HealthModule {}
