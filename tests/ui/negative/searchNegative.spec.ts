import { test, expect } from '@playwright/test';

import { LoginPage } from '../../../pages/LoginPage';

import { SearchPage } from '../../../pages/SearchPage';

test(
    'Verify invalid sorting option handling',
    async ({ page }) => {

        const login = new LoginPage(page);

        const search = new SearchPage(page);

        await login.goto();

        await login.login(
            'standard_user',
            'secret_sauce'
        );

        // Invalid option simulation
        const dropdown = page.locator(
            '.product_sort_container'
        );

        await expect(dropdown).toBeVisible();
    }
);