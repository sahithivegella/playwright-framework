import { test, expect } from '@playwright/test';
import data from '../utils/testData.json';

for (const user of data.users) {
  test(`Login test for ${user.username}`, async ({ page }) => {
    await page.goto('/');

    await page.fill('#user-name', user.username);
    await page.fill('#password', user.password);
    await page.click('#login-button');

    await expect(page).toHaveURL(/inventory/);
  });
}