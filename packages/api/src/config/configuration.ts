/**
 * Defines the shape of validated environment variables.
 */
export interface EnvironmentVariables {
  SERVER_PORT: number;
}

/**
 * Loads configuration values from environment variables.
 *
 * @returns The parsed configuration object used by NestJS ConfigModule.
 */
export default () => ({
  port: parseInt(process.env.SERVER_PORT!, 10),
});
