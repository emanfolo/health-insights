import {test, expect} from '@playwright/test';
import exploreFixture from './exploreFixture.json'

test.beforeEach(async ({ page }) => {
    await page.route('**/api/explore', (route) => route.fulfill({
      contentType: 'application/json',
      status: 200,
      body: JSON.stringify(exploreFixture),
    }));
  });

test ('Check that explore page loads correctly', async ({page}) => {
    const baseUrl = process.env.TEST_URL || 'http://localhost:3000';
    await page.goto(`${baseUrl}/explore`);
    const title = await page.title();
    expect(title).toBe('WellnessMate - View Recipes');
});