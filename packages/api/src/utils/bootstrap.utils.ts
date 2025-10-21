import { INestApplication } from '@nestjs/common';

/**
 * Configures the global API application.
 *
 * Sets up global route prefixing and other shared configurations.
 *
 * @param app - The NestJS application instance.
 * @returns The configured application.
 */
export function configureApp(app: INestApplication): INestApplication {
  app.setGlobalPrefix('/api', { exclude: ['/health'] });
  return app;
}
