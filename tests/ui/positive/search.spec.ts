import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { ProductPage } from '../../../pages/ProductPage';

test.describe('Filters and Sorting', () => {
  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('standard_user', 'secret_sauce');
  });

  test('Sort by price low to high', async ({ page }) => {
    const product = new ProductPage(page);

    await product.sortProducts('lohi');

    const prices = await product.getProductPrices();
    const sortedPrices = [...prices].sort((a, b) => a - b);

    expect(prices).toEqual(sortedPrices);
  });

  test('Sort by name A to Z', async ({ page }) => {
    const product = new ProductPage(page);

    await product.sortProducts('az');

    const names = await product.getProductNames();
    const sortedNames = [...names].sort((a, b) => a.localeCompare(b));

    expect(names).toEqual(sortedNames);
  });
});