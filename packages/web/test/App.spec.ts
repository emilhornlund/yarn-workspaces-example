import { test, expect } from '@playwright/test';

test.describe('App greeting flow', () => {
  test('shows greeting from /api/hello after clicking the button', async ({ page }) => {
    // Navigate to the home page (baseURL set in config)
    await page.goto('/');

    // Initial state
    const button = page.getByRole('button'); // stable
    await expect(button).toHaveText('Greet Me');
    await expect(button).toBeVisible();

    // Wait for the actual network call in parallel with the click
    const [response] = await Promise.all([
      page.waitForResponse((resp) =>
        resp.url().includes('/api/hello?name=React%2BVite') && resp.ok()
      ),
      button.click(),
    ]);

    // Sanity check DTO shape
    const data = await response.json();
    expect(data).toHaveProperty('message');

    // Button text should now reflect the greeting from the API
    await expect(button).toHaveText('Hello, React+Vite!');
  });
});
