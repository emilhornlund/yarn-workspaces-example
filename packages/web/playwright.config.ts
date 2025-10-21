import { defineConfig, devices } from '@playwright/test';
import { loadEnv } from 'vite';

const env = loadEnv('development', process.cwd(), ''); // returns plain strings
const SERVER_PORT = env.SERVER_PORT || '3000';
const API_PROXY = env.API_PROXY || 'http://localhost:3001/api';

const apiUrl = new URL(API_PROXY);
apiUrl.pathname = '/health';

export default defineConfig({
  testDir: './test',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html', { open: 'never' }]],
  use: {
    baseURL: `http://localhost:${SERVER_PORT}`,
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox',  use: { ...devices['Desktop Firefox'] } },
  ],
  webServer: [
    {
      // Vite dev server (front-end)
      command: 'yarn dev',
      url: `http://localhost:${SERVER_PORT}`,
      reuseExistingServer: !process.env.CI,
      stdout: 'pipe',
      stderr: 'pipe',
      timeout: 30_000,
    },
    {
      // API dev server (back-end)
      command: 'yarn workspace @app/api run start:dev',
      url: apiUrl.toString(),
      reuseExistingServer: !process.env.CI,
      stdout: 'pipe',
      stderr: 'pipe',
      timeout: 30_000,
    },
  ],
});
