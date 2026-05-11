import { test, expect } from '@playwright/test';

import { LoginPage } from '../../../pages/LoginPage';

import { SearchPage } from '../../../pages/SearchPage';

test.describe('Search and Sorting Tests', () => {

    test(
        'Verify products displayed after login',
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

    test(
        'Verify low to high sorting',
        async ({ page }) => {

            const login = new LoginPage(page);

            const search = new SearchPage(page);

            await login.goto();

            await login.login(
                'standard_user',
                'secret_sauce'
            );

            await search.sortProducts(
                'lohi'
            );

            const prices = await search.getAllPrices();

            const sortedPrices = [...prices].sort(
                (a, b) => a - b
            );

            expect(prices).toEqual(sortedPrices);
        }
    );

    test(
        'Verify high to low sorting',
        async ({ page }) => {

            const login = new LoginPage(page);

            const search = new SearchPage(page);

            await login.goto();

            await login.login(
                'standard_user',
                'secret_sauce'
            );

            await search.sortProducts(
                'hilo'
            );

            const prices = await search.getAllPrices();

            const sortedPrices = [...prices].sort(
                (a, b) => b - a
            );

            expect(prices).toEqual(sortedPrices);
        }
    );
});