import { test, expect } from '@playwright/test';

import { LoginPage } from '../../../pages/LoginPage';

import { SearchPage } from '../../../pages/SearchPage';

test.describe('Advanced Product Validation', () => {

    test(
        'Verify partial product name validation',
        async ({ page }) => {

            const login = new LoginPage(page);

            const search = new SearchPage(page);

            await login.goto();

            await login.login(
                'standard_user',
                'secret_sauce'
            );

    const matchedProduct = page
    .locator('.inventory_item_name')
    .filter({ hasText: 'Backpack' });

    await expect(matchedProduct).toHaveCount(1);
    await expect(matchedProduct).toContainText('Sauce Labs Backpack');

    await search.verifyProductsDisplayed();
        }
    );

    test(
        'Verify multiple products displayed',
        async ({ page }) => {

            const login = new LoginPage(page);

            const search = new SearchPage(page);

            await login.goto();

            await login.login(
                'standard_user',
                'secret_sauce'
            );

            await search.verifyProductsDisplayed();
        }
    );
});